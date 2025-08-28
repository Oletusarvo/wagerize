import { Knex } from 'knex';
import { TBet } from '../schemas/betSchema';
import { getBet } from '../DAL/getBet';
import { bidSchema, TBid } from '@/features/bids/schemas/bidSchema';
import { BidError } from '@/features/bids/error/BidError';
import { tablenames } from '@/tablenames';
import { getBid } from '@/features/bids/dal/getBid';
import { BetError } from '../error/BetError';
import { io } from '@/features/io/lib/io';
import z from 'zod';

export class Bet {
  public data: TBet;
  constructor(data: TBet) {
    this.data = data;
  }

  static async load(id: string, ctx: Knex | Knex.Transaction) {
    return new Bet(await getBet(ctx).where({ id }).first());
  }

  private verifyBidAmount(amount: number) {
    const { min_bid, min_raise, max_raise } = this.data;
    //Prevent bidding if the bid amount is too small
    if (amount < min_bid) {
      return {
        success: false,
        error: BidError.BID_TOO_SMALL,
      };
    }

    if (amount > min_bid) {
      const difference = amount - min_bid;
      //Prevent bidding if raising by too little
      if (min_raise && difference < min_raise) {
        return {
          success: false,
          error: BidError.RAISE_TOO_SMALL,
        };
      }

      //Prevent bidding if raising by too much
      if (max_raise && difference > max_raise) {
        return {
          success: false,
          error: BidError.RAISE_TOO_LARGE,
        };
      }
    }

    return {
      success: true,
    };
  }

  private verifyStatus() {
    const { status } = this.data;
    if (status === 'frozen') {
      return {
        success: false,
        error: BetError.FROZEN,
      };
    } else if (this.isExpired()) {
      return {
        success: false,
        error: BetError.EXPIRED,
      };
    }
    return { success: true };
  }

  private isExpired() {
    return !!this.data.expires_at && Date.now() >= new Date(this.data.expires_at).getTime();
  }

  private async hasHitBidQuota(user_id: string, ctx: Knex | Knex.Transaction) {
    const quota = process.env.BID_QUOTA;
    if (quota) {
      const countRecord = await ctx(tablenames.bid)
        .join(ctx.select('id').from(tablenames.wallet).as('wallet'), 'wallet.id', 'bid.wallet_id')
        .where({ 'wallet.user_id': user_id })
        .count('* as count')
        .select(ctx.raw('CAST(count as INTEGER) as count'))
        .first();

      const count =
        typeof countRecord.count === 'string' ? parseInt(countRecord.count) : countRecord.count;
      if (count >= parseInt(quota)) {
        return true;
      }
    }
    return false;
  }

  async placeBid(session: any, bid: z.infer<typeof bidSchema>, ctx: Knex | Knex.Transaction) {
    const walletRecord = await ctx
      .select('id')
      .from(tablenames.wallet)
      .where({ currency_id: this.data.currency_id, user_id: session.user.id })
      .first();

    const previousBidRecord = await getBid(ctx)
      .where({ wallet_id: walletRecord.id, bet_id: bid.bet_id })
      .select(ctx.raw('CAST(amount as INTEGER) as amount'), 'status', 'bid.id')
      .first();

    //Prevent bidding if the quota is hit.
    if (!previousBidRecord && (await this.hasHitBidQuota(session.user.id, ctx))) {
      return {
        success: false,
        error: BidError.QUOTA_FULL,
      };
    }

    const statusVerifyResult = this.verifyStatus();
    if (!statusVerifyResult.success) {
      return {
        success: false,
        error: statusVerifyResult.error,
      };
    }

    const amount = bid.amount + (previousBidRecord?.amount || 0);
    const bidVerifyResult = this.verifyBidAmount(amount);
    if (!bidVerifyResult.success) {
      return {
        success: false,
        error: bidVerifyResult.error,
      };
    }

    const promises = [];
    if (previousBidRecord) {
      promises.push(
        ctx(tablenames.bid).where({ id: previousBidRecord.id }).update({
          amount,
        })
      );
    } else {
      promises.push(
        ctx(tablenames.bid).insert({
          ...bid,
          wallet_id: walletRecord.id,
          amount,
        })
      );
    }

    promises.push(
      ctx(tablenames.bet_metadata).where({ bet_id: bid.bet_id }).update({
        min_bid: amount,
      })
    );

    await Promise.all(promises);

    return { success: true };
  }
}
