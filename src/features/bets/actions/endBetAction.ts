'use server';

import { addNotificationAction } from '@/features/users/notifications/schemas/actions/addNotificationAction';
import { getSession } from '@/utils/getSession';
import db from 'betting_app/dbconfig';

export async function endBetAction(betId: string, outcomeId: string) {
  let result: { code: number | string } = {
    code: 0,
  };
  const trx = await db.transaction();
  try {
    //Get the winning participant wallets.
    const winningWallets = await trx('users.wallet as wallet')
      .leftJoin(db.raw('bets.bid as bid on bid.bet_id = ?', [betId]))
      .whereRaw(
        'bid.outcome_id = ? AND CASE WHEN bid.user_id IS NOT NULL THEN bid.user_id = wallet.user_id ELSE FALSE END',
        [outcomeId]
      )
      .select('wallet.id', 'wallet.user_id')
      .groupBy('wallet.id');

    //Get the pool
    const [{ bidTotal }] = await trx('bets.bid').where({ bet_id: betId }).sum('amount as bidTotal');

    if (bidTotal === undefined) {
      throw new Error('Failed to sum bid amounts!');
    }

    const pool = typeof bidTotal === 'string' ? parseInt(bidTotal) : bidTotal;

    //Determine the share of the pool given to the creator.
    const numWinners = winningWallets.length;
    const creatorShare = pool % (numWinners || 1);

    //Calculate the share given to each winner.
    const winnerShare = numWinners > 0 ? (pool - creatorShare) / numWinners : 0;

    //Update the wallets of each winner.
    const promises = winningWallets.map(
      async wallet =>
        new Promise<void>(async (resolve, reject) => {
          try {
            await trx('users.wallet').where({ id: wallet.id }).increment('balance', winnerShare);
            
            resolve();
          } catch (err) {
            reject(err);
          }
        })
    );
    await Promise.all(promises);

    //Give the creator their share.
    const bet = await trx('bets.bet').where({ id: betId }).select('author_id').first();
    await trx('users.wallet').where({ user_id: bet.author_id }).increment('balance', creatorShare);

    //All done. Delete the bet.
    await trx('bets.bet').where({ id: betId }).del();
    await trx.commit();

    result.code = 0;
  } catch (err) {
    await trx.rollback();
    console.log(err.message);
    result.code = -1;
  }

  return result;
}
