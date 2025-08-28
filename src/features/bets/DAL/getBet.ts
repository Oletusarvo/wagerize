import { tablenames } from '@/tablenames';
import { Knex } from 'knex';

export function getBet(ctx: Knex | Knex.Transaction, search?: string) {
  const q = ctx({ bet: tablenames.bet })
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
      //db.raw("ARRAY_AGG(JSON_BUILD_OBJECT('label', outcome.label, 'id', outcome.id)) as outcomes")
    );

  if (search) {
    const str = `%${search}%`;
    q.where(function () {
      this.whereILike('title', str).orWhereILike('description', str);
    });
  }
  return q;
}
