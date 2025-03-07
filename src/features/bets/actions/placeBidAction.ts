'use server';

import { getSession } from '@/utils/getSession';
import db from 'betting_app/dbconfig';
import { revalidatePath } from 'next/cache';

export async function placeBidAction(payload: any) {
  const trx = await db.transaction();
  try {
    //Include the user as the author, and insert the bid.
    const session = await getSession();
    payload.user_id = session.user.id;
    await trx('bets.bid').insert(payload);

    //Decrement the user's wallet balance.
    await trx('users.wallet')
      .where({ user_id: session.user.id })
      .decrement('balance', payload.amount);

    //Commit
    await trx.commit();
    revalidatePath('/auth/bets');
    return 0;
  } catch (err) {
    console.log(err.message);
    return 'unknown';
  }
}
