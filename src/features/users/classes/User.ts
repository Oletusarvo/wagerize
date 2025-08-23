import { tablenames } from '@/tablenames';
import db from 'betting_app/dbconfig';
import { Knex } from 'knex';
import { BetType } from '../../bets/types/BetType';
import { BetError, WError } from '@/utils/error';
import { betSchema } from '../../bets/schemas/betSchema';
import { optionsSchema } from '../../bets/schemas/optionsSchema';

export class User {
  private id: string;
  private status_id: number;

  constructor({ id, status_id }: { id: string; status_id?: number }) {
    this.id = id;
    this.status_id = status_id;
  }

  static async load(id: string, ctx: Knex | Knex.Transaction) {
    const [data] = await ctx(tablenames.users).where({ id }).select('id', 'status_id');
    return new User(data);
  }

  async validateBetCount(ctx: Knex | Knex.Transaction) {
    const maxBetCount = process.env.MAX_BETS;
    if (maxBetCount) {
      const betCount = await this.getAuthoredBetCount(ctx);
      if (betCount >= parseInt(maxBetCount)) {
        throw new Error(WError.QUOTA_FULL);
      }
    }
  }

  async validateBidCount(ctx: Knex | Knex.Transaction) {
    const maxBids = process.env.MAX_BIDS;
    if (!maxBids) return;

    const [{ count }] = await ctx(tablenames.bids)
      .join(db.raw('?? on ??.user_id = ?', [tablenames.wallets, tablenames.wallets, this.id]))
      .where(`${tablenames.wallets}.user_id`, this.id)
      .count('* as count');
    const bidCount = typeof count === 'string' ? parseInt(count) : count;

    if (bidCount >= parseInt(maxBids)) {
      throw new Error(BetError.MAX_BIDS);
    }
  }
  async getBidCount(ctx: Knex | Knex.Transaction) {
    const [{ count }] = await ctx(tablenames.bids)
      .join(db.raw('?? on ??.user_id = ?', [tablenames.wallets, tablenames.wallets, this.id]))
      .where({ id: this.id })
      .count('* as count');

    const n = typeof count === 'string' ? parseInt(count) : count;
    return n;
  }

  async getAuthoredBetCount(ctx: Knex | Knex.Transaction) {
    const [{ count }] = await ctx(tablenames.bets)
      .where({ author_id: this.id })
      .count('* as count');
    return typeof count === 'string' ? parseInt(count) : count;
  }

  async createBet(
    payload: Omit<BetType, 'id' | 'created_at'>,
    opts: string[],
    ctx: Knex | Knex.Transaction
  ) {
    //Make sure the outcomes don't exceed the quota.
    const maxOutcomes = process.env.MAX_OUTCOMES;
    if (opts.length > parseInt(maxOutcomes)) {
      throw new Error(BetError.MAX_OUTCOMES);
    }

    await this.validateBetCount(ctx);

    //Add the currency id.
    const [currencyId] = await ctx(tablenames.currencies).where({ symbol: 'DICE' }).pluck('id');
    payload.currency_id = currencyId;

    //Validate the bet data.
    payload.author_id = this.id;
    const parsedPayload = betSchema.parse(payload);
    optionsSchema.parse(opts);

    //Insert the new bet into the database.
    const [{ id }] = await ctx(tablenames.bets).insert(parsedPayload).returning('id');
    await ctx(tablenames.outcomes).insert(opts.map(opt => ({ label: opt, bet_id: id })));
  }

  async decrementWalletBalance(currency_id: string, amount: number, ctx: Knex | Knex.Transaction) {
    await ctx(tablenames.wallets)
      .where({ user_id: this.id, currency_id })
      .decrement('balance', amount);
  }

  async getWalletId(currency_id: string, ctx: Knex | Knex.Transaction) {
    const [id] = await ctx(tablenames.wallets).where({ user_id: this.id, currency_id }).pluck('id');
    return id;
  }
}
