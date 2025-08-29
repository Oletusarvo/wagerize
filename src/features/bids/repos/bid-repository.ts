import { DBContext } from '@/db-context';
import { tablenames } from '@/tablenames';
import { TBid } from '../schemas/bid-schema';

export class BidRepository {
  private getBaseQuery(ctx: DBContext) {
    return ctx({ bid: tablenames.bid })
      .join(
        ctx
          .select('id as status_id_actual', 'label as status')
          .from(tablenames.bid_status)
          .groupBy('id', 'label')
          .as('bid_status'),
        'bid_status.status_id_actual',
        'bid.bid_status_id'
      )
      .join(
        ctx
          .select('id as outcome_id_actual', 'label as outcome')
          .from(tablenames.bet_option)
          .groupBy('id', 'outcome')
          .as('outcome'),
        'outcome.outcome_id_actual',
        'bid.outcome_id'
      )
      .join(
        ctx
          .select('user_id', 'id as wallet_id_actual')
          .from(tablenames.wallet)
          .groupBy('user_id', 'id')
          .as('wallet'),
        'wallet.wallet_id_actual',
        'bid.wallet_id'
      )
      .select(
        ctx.raw('CAST(amount as INTEGER) as amount') as any,
        'wallet.user_id',
        'bet_id',
        'id',
        'outcome.outcome',
        'bid.wallet_id'
      );
  }

  findBy(query: any, ctx: DBContext) {
    return this.getBaseQuery(ctx).where(query);
  }

  async findById(id: string, ctx: DBContext) {
    return await this.getBaseQuery(ctx)
      .where({ id })

      .first();
  }

  async findByBetId(bet_id: string, ctx: DBContext) {
    return await this.getBaseQuery(ctx).where({ bet_id }).first();
  }

  async findByUserId(user_id: string, ctx: DBContext) {
    return await this.getBaseQuery(ctx).where({ user_id }).first();
  }

  async findByOutcomeId(outcome_id: string, ctx: DBContext) {
    return await this.getBaseQuery(ctx).where({ outcome_id });
  }

  async create(bid: TBid, ctx: DBContext) {
    return await ctx(tablenames.bid).insert(bid).returning('id');
  }

  async update(id: string, payload: any, ctx: DBContext) {
    return await ctx(tablenames.bid).where({ id }).update(payload);
  }

  async countByUserId(user_id: string, ctx: DBContext) {
    const result = await ctx(tablenames.bid)
      .join(
        ctx
          .select('id as wallet_id_actual', 'user_id')
          .from(tablenames.wallet)
          .groupBy('wallet_id_actual', 'user_id')
          .as('wallet'),
        'wallet.wallet_id_actual',
        'bid.wallet_id'
      )
      .where({ user_id })
      .count('* as count')
      .first();
    return typeof result.count === 'string' ? parseInt(result.count) : result.count;
  }
}
