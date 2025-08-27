import { tablenames } from '@/tablenames';
import db from 'betting_app/dbconfig';
import { Knex } from 'knex';

export function getWallet(ctx: Knex | Knex.Transaction) {
  return ctx({ wallet: tablenames.wallet })
    .leftJoin(
      db
        .select('wallet_id')
        .sum('amount as bid_total')
        .from(tablenames.bid)
        .groupBy('wallet_id')
        .as('bid'),
      'bid.wallet_id',
      'wallet.id'
    )
    .select(
      'wallet.id',
      'wallet.currency_id',
      'wallet.user_id',
      db.raw('CAST(wallet.balance - COALESCE(bid.bid_total, 0) as INTEGER) as current_balance')
    );
}
