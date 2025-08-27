import { tablenames } from '@/tablenames';
import { Knex } from 'knex';

export function getBid(ctx: Knex | Knex.Transaction) {
  return ctx({ bid: tablenames.bid })
    .join(
      ctx
        .select('id', 'label as status')
        .from(tablenames.bid_status)
        .groupBy('id', 'label')
        .as('bid_status'),
      'bid_status.id',
      'bid.bid_status_id'
    )
    .join(
      ctx.select('user_id', 'id').from(tablenames.wallet).groupBy('user_id', 'id').as('wallet'),
      'wallet.id',
      'bid.wallet_id'
    );
  //.select('bid.id as id', 'wallet.user_id');
}
