import { DBContext } from '@/db-context';
import { tablenames } from '@/tablenames';
import { TBet } from '../schemas/bet-schema';
import { Knex } from 'knex';

export class BetRepository {
  private getBaseQuery(ctx: DBContext) {
    return ctx({ bet: tablenames.bet })
      .join(ctx(tablenames.bet_metadata).as('metadata'), 'metadata.bet_id', 'bet.id')
      .join(
        ctx
          .select('user.username', 'user.id as user_id')
          .from(tablenames.user)
          .groupBy('user.username', 'user.id')
          .as('user'),
        'user.user_id',
        'bet.author_id'
      )
      .join(
        ctx
          .select(
            'bet_id',
            ctx.raw("ARRAY_AGG(JSON_BUILD_OBJECT('label', label, 'id', id)) as outcomes")
          )
          .from(tablenames.bet_option)
          .groupBy('outcome.bet_id')
          .as('outcome'),
        'outcome.bet_id',
        'bet.id'
      )
      .join(
        ctx
          .select('id as status_id', 'label as status_label')
          .from(tablenames.bet_status)
          .as('bet_status'),
        'bet_status.status_id',
        'bet.bet_status_id'
      )
      .leftJoin(
        ctx
          .select('bet_id', ctx.raw('SUM(amount)::int as pool'))
          .from(tablenames.bid)
          .groupBy('bet_id')
          .as('bid'),
        'bid.bet_id',
        'bet.id'
      )
      .select(
        'metadata.*',
        'bet.id as id',
        'bet.expires_at',
        'bet.created_at',
        'bet.currency_id',
        'bet.author_id',
        'bet_status.status_label as status',
        'outcome.outcomes',
        'user.username as author',
        ctx.raw('CAST(COALESCE(bid.pool, 0) as INTEGER) as pool')
      );
  }

  async countByUserId(user_id: string, ctx: DBContext) {
    const result = await ctx(tablenames.bet)
      .where({ author_id: user_id })
      .count('* as count')
      .first();

    return typeof result.count === 'string' ? parseInt(result.count) : result.count;
  }

  async getAuthorId(id: string, ctx: DBContext) {
    const [result] = await ctx(tablenames.bet).where({ id }).pluck('author_id').first();
    return result;
  }

  async getCurrencyId(id: string, ctx: DBContext) {
    const [result] = await ctx(tablenames.bet).where({ id }).pluck('currency_id');
    return result;
  }

  async findById(id: string, ctx: DBContext) {
    return await this.getBaseQuery(ctx).where({ 'bet.id': id }).first();
  }

  async findByAuthor(author_id: string, limit: number, ctx: DBContext) {
    return await this.getBaseQuery(ctx)
      .where({ 'bet.author_id': author_id })
      .limit(limit)
      .orderBy('created_at', 'desc');
  }

  async findBySearch(search: string, limit: number, ctx: DBContext) {
    const q = this.getBaseQuery(ctx)
      .where(function () {
        const str = `%${search}%`;
        this.whereILike('title', str).orWhereILike('description', str);
      })
      .limit(limit)
      .orderBy('created_at', 'desc');
    return await q;
  }

  async updateMetadata(bet: any, ctx: DBContext) {
    await ctx(tablenames.bet_metadata).where({ bet_id: bet.id }).update({
      title: bet.title,
      description: bet.description,
      min_bid: bet.min_bid,
    });
  }

  async update(bet: any, ctx: DBContext) {
    await ctx(tablenames.bet).where({ id: bet.id }).update(bet);
  }

  async deleteById(bet_id: string, ctx: DBContext) {
    return await ctx(tablenames.bet).where({ id: bet_id }).del();
  }

  async create(payload: any, ctx: DBContext) {
    return await ctx(tablenames.bet).insert(payload).returning('id');
  }

  async createMetadata(payload: any, ctx: DBContext) {
    return await ctx(tablenames.bet_metadata).insert(payload);
  }

  async createOptions(payload: any, ctx: DBContext) {
    return await ctx(tablenames.bet_option).insert(payload).returning('id');
  }
}
