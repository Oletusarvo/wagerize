import { AuthError } from '@/features/auth/error/AuthError';
import { tablenames } from '@/tablenames';
import db from 'betting_app/dbconfig';
import { Knex } from 'knex';

export async function verifyWalletOwnership(
  session: TODO,
  wallet_id: string,
  ctx: Knex | Knex.Transaction
) {
  const walletRecord = await ctx(tablenames.wallet)
    .where({
      id: wallet_id,
    })
    .select('user_id')
    .first();

  if (walletRecord.user_id !== session.user.id) {
    return false;
  }

  return true;
}
