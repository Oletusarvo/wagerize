import db from 'betting_app/dbconfig';
import { Bets } from '../DAL/Bets';
import { Knex } from 'knex';
import { tablenames } from '@/tablenames';
import { BetError } from '@/utils/error';
import { BetStatus } from '../constants/BetStatus';

type BidType = {
  amount: number;
  user_id: string;
  wallet_id: string;
};

export class Bet {
  private title: string;
  private id: string;
  private min_bid: number;
  private min_raise: number = 1;
  private max_raise: number;
  private expires_at: string;
  private currency_id: string;
  private status: number;

  constructor({ id, title, min_raise, min_bid, max_raise, expires_at, currency_id, status }: any) {
    this.title = title;
    this.id = id;
    this.max_raise = max_raise;
    this.min_raise = min_raise || 1;
    this.min_bid = min_bid || 1;
    this.expires_at = expires_at;
    this.currency_id = currency_id;
    this.status = status;
  }

  public static async load(id: string, ctx: Knex | Knex.Transaction) {
    const [bet] = await ctx(tablenames.bets)
      .where({ id })
      .select('data', 'expires_at', 'currency_id');
    return new Bet({
      id,
      title: bet.data.title,
      min_raise: bet.data.min_raise,
      max_raise: bet.data.max_raise,
      min_bid: bet.data.min_bid,
      expires_at: bet.expires_at,
      currency_id: bet.currency_id,
      status: bet.data.status,
    });
  }

  public async save(ctx: Knex | Knex.Transaction) {
    const [currentData] = await ctx(tablenames.bets).where({ id: this.id }).select('data');
    const { min_bid, min_raise, max_raise } = this;
    await ctx(tablenames.bets)
      .where({ id: this.id })
      .update({
        data: {
          ...currentData.data,
          min_bid,
          min_raise,
          max_raise,
        },
      });
  }

  private raiseBidIsTooSmallError() {
    throw new Error(BetError.BID_TOO_SMALL);
  }

  private validateRaise(amount: number) {
    const { min_raise, max_raise } = this;
    if (min_raise && amount < min_raise) {
      throw new Error(BetError.RAISE_TOO_SMALL);
    }

    if (max_raise && amount > max_raise) {
      throw new Error(BetError.RAISE_TOO_LARGE);
    }
  }

  /**Throws an error if the bet is expired. */
  private validateBetIsOpen() {
    const { expires_at, status } = this;
    const now = Date.now();
    if (expires_at && now >= new Date(expires_at).getTime()) {
      throw new Error(BetError.EXPIRED);
    }

    if (status == BetStatus.FROZEN) {
      throw new Error(BetError.FROZEN);
    }
  }

  public get currencyId() {
    return this.currency_id;
  }

  public async raiseBid(id: string, amount: number, ctx: Knex | Knex.Transaction) {
    this.validateBetIsOpen();
    const [prevBid] = await ctx(tablenames.bids).where({ id }).select('amount', 'folded');
    if (prevBid.folded) {
      this.raiseBidIsTooSmallError();
    }
    const { min_bid } = this;
    const newAmount = prevBid.amount + amount;
    if (newAmount < min_bid) {
      this.raiseBidIsTooSmallError();
    } else if (newAmount > min_bid) {
      this.validateRaise(newAmount - min_bid);
    }

    await ctx(tablenames.bids).where({ id }).update({ amount: newAmount });
    this.min_bid = newAmount;
  }

  public async placeBid(newBid: BidType, ctx: Knex | Knex.Transaction) {
    this.validateBetIsOpen();
    /*
    if (newBid.currency_id !== this.currency_id) {
      throw new Error(BetError.INVALID_CURRENCY);
    }*/
    const { min_bid } = this;

    const [prevBid] = await ctx(tablenames.bids)
      .where({ bet_id: this.id, wallet_id: newBid.wallet_id })
      .select('amount', 'id');
    if (prevBid) {
      throw new Error(BetError.BID_ALREADY_PLACED);
    }

    if (newBid.amount < min_bid) {
      this.raiseBidIsTooSmallError();
    } else if (newBid.amount > min_bid) {
      this.validateRaise(newBid.amount - min_bid);
    }

    await ctx(tablenames.bids).insert(newBid);
    this.min_bid = newBid.amount;
  }

  async foldBid(id: string, ctx: Knex | Knex.Transaction) {
    this.validateBetIsOpen();
    await ctx(tablenames.bids).where({ id }).update({ folded: true });
  }
}
