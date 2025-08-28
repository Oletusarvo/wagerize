import { tablenames } from '@/tablenames';
import db from 'betting_app/dbconfig';
import { Knex } from 'knex';

/**@deprecated */
export function getWallet(ctx: Knex | Knex.Transaction) {
  return ctx({ wallet: tablenames.wallet });
}
