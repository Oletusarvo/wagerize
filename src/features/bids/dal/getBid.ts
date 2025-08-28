import { tablenames } from '@/tablenames';
import { Knex } from 'knex';

export function getBid(ctx: Knex | Knex.Transaction) {
  return ctx({ bid: tablenames.bid })
    .join(
      ctx
        .select('id as status_id', 'label as status')
        .from(tablenames.bid_status)
        .groupBy('id', 'label')
        .as('bid_status'),
      'bid_status.status_id',
      'bid.bid_status_id'
    )
    .join(
      ctx
        .select('id as outcome_id', 'label as outcome')
        .from(tablenames.bet_option)
        .groupBy('id', 'outcome')
        .as('outcome'),
      'outcome.outcome_id',
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
    );
  //.select('bid.id as id', 'wallet.user_id');
}
