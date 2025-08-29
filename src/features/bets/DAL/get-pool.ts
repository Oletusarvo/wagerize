import { tablenames } from '@/tablenames';
import db from 'betting_app/dbconfig';
import { Knex } from 'knex';

/**@deprecated */
export function getPool(ctx: Knex | Knex.Transaction) {
  return ctx({ bet: tablenames.bet })
    .leftJoin(
      db.select('bet_id').sum('amount as pool').from(tablenames.bid).groupBy('bet_id').as('bid'),
      'bid.bet_id',
      'bet.id'
    )
    .select(ctx.raw('CAST(COALESCE(pool, 0) AS INTEGER) as pool') as any);
}
