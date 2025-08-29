import { Service } from '@/utils/service';
import { BetRepository } from '../repos/bet-repository';
import { TBid } from '@/features/bids/schemas/bid-schema';
import { DBContext } from '@/db-context';
import { bidService } from '@/features/bids/services/bid-service';
import { TBet } from '../schemas/bet-schema';
import { BidError } from '@/features/bids/error/bid-error';
import { BetError } from '../error/bet-error';
import { userService } from '@/features/users/services/user-service';
import { AuthError } from '@/features/auth/error/auth-error';
import { tablenames } from '@/tablenames';

class BetService extends Service<BetRepository> {
  constructor(repo) {
    super(repo);
  }

  private verifyStatus(status: string) {
    if (status === 'frozen') {
      throw new Error(BetError.FROZEN);
    }
  }

  private verifyActive(expires_at: string) {
    if (expires_at && Date.now() >= new Date(expires_at).getTime()) {
      throw new Error(BetError.EXPIRED);
    }
  }

  private verifyExpired(expires_at: string) {
    if (expires_at && Date.now() < new Date(expires_at).getTime()) {
      throw new Error(BetError.ACTIVE);
    }
  }

  private verifyBidAmount(amount: number, min_bid: number, min_raise: number, max_raise: number) {
    //Prevent bidding if the bid amount is too small
    if (amount < min_bid) {
      throw new Error(BidError.BID_TOO_SMALL);
    }

    if (amount > min_bid) {
      const difference = amount - min_bid;
      //Prevent bidding if raising by too little
      if (min_raise && difference < min_raise) {
        throw new Error(BidError.RAISE_TOO_SMALL);
      }

      //Prevent bidding if raising by too much
      if (max_raise && difference > max_raise) {
        throw new Error(BidError.RAISE_TOO_LARGE);
      }
    }
  }

  private calculateRewards(pool: number, winnerCount: number) {
    //Determine the share of the pool given to the creator.
    const creatorShare = pool % (winnerCount || 1);
    //Calculate the share given to each winner.
    const winnerShare = winnerCount > 0 ? (pool - creatorShare) / winnerCount : 0;
    return { winnerShare, creatorShare };
  }

  async verifyBetQuota(user_id: string, ctx: DBContext) {
    const count = await this.repo.countByUserId(user_id, ctx);
    const subscription = await userService.repo.getSubscriptionByUserId(user_id, ctx);
    if (count >= subscription.max_bets) {
      throw new Error(BetError.QUOTA_REACHED);
    }
  }

  async verifyAuthorShip(betId: string, session: any, ctx: DBContext) {
    const bet = await this.repo.findById(betId, ctx);
    if (bet.author_id !== session.user.id) {
      throw new Error(AuthError.UNAUTHORIZED);
    }
  }

  async placeBid(bid: TODO, ctx: DBContext) {
    const bet = await this.repo.findById(bid.bet_id, ctx);

    this.verifyStatus(bet.status);
    this.verifyActive(bet.expires_at);

    const previousBid = bid.id ? await bidService.repo.findById(bid.id, ctx) : null;
    const amount = bid.amount + (previousBid?.amount || 0);
    console.log(amount);
    this.verifyBidAmount(amount, bet.min_bid, bet.min_raise, bet.max_raise);

    const promises = [];
    if (previousBid) {
      promises.push(
        bidService.repo.update(
          bid.id,
          {
            amount,
          },
          ctx
        )
      );
    } else {
      promises.push(
        bidService.repo.create(
          {
            ...bid,
            bet_id: bet.id,
          } as TODO,
          ctx
        )
      );
    }
    promises.push(this.repo.updateMetadata({ id: bet.id, min_bid: amount }, ctx));
    await Promise.all(promises);
  }

  async endBet(bet_id: string, outcome_id: string, ctx: DBContext) {
    const bet = await this.repo.findById(bet_id, ctx);

    this.verifyStatus(bet.status);
    this.verifyExpired(bet.expires_at);

    const winningBids = await bidService.repo.findByOutcomeId(outcome_id, ctx);
    const rewards = this.calculateRewards(bet.pool, winningBids.length);
    await this.repo.deleteById(bet_id, ctx);

    return {
      authorId: bet.author_id,
      currencyId: bet.currency_id,
      winningWalletIds: winningBids.map(b => b.wallet_id),
      rewards,
    };
  }
}

export const betService = new BetService(new BetRepository());
