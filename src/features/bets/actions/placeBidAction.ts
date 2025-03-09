'use server';

import { getSession } from '@/utils/getSession';
import db from 'betting_app/dbconfig';
import { revalidatePath } from 'next/cache';

export async function placeBidAction(payload: any) {
  const trx = await db.transaction();
  try {
    /*Include the user's wallet id with the required currency, and insert the bid.
     * Currently only supports the default DICE currency.
     */
    const session = await getSession();
    const [currencyId] = await trx('bets.bet').where({ id: payload.bet_id }).pluck('currency_id');
    const [walletId] = await trx('users.wallet')
      .where({
        user_id: session.user.id,
        currency_id: currencyId,
      })
      .pluck('id');

    payload.wallet_id = walletId;
    await trx('bets.bid').insert(payload);

    //Decrement the user's wallet balance.
    await trx('users.wallet').where({ id: walletId }).decrement('balance', payload.amount);

    //Commit
    await trx.commit();
    revalidatePath('/auth/bets');
    return 0;
  } catch (err) {
    await trx.rollback();
    console.log(err.message);
    return 'unknown';
  }
}
