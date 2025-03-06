'use server';

import { getSession } from '@/utils/getSession';
import db from 'betting_app/dbconfig';

export async function endBetAction(betId: string, outcomeId: string) {
  let result: { code: number | string } = {
    code: 0,
  };
  const trx = await db.transaction();
  try {
    //Get the winning participant wallets.
    const winningWallets = await trx('bets.bet as bet')
      .leftJoin(db.raw('bets.bid as bid on bid.bet_id = ?', [betId]))
      .leftJoin(db.raw('users.wallet as wallet on wallet.user_id = bid.user_id'))
      .where({ 'bid.outcome_id': outcomeId })
      .select('wallet.id')
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
    console.log(pool, numWinners);
    //Calculate the share given to each winner.
    const winnerShare = numWinners > 0 ? (pool - creatorShare) / numWinners : 0;
    console.log(winnerShare);
    //Update the wallets of each winner.
    const promises = winningWallets.map(async wallet =>
      trx('users.wallet').where({ id: wallet.id }).increment('balance', winnerShare)
    );
    await Promise.all(promises);

    //Give the creator their share.
    const session = await getSession();
    await trx('users.wallet')
      .where({ user_id: session.user.id })
      .increment('balance', creatorShare);

    //All done. Delete the bet.
    await trx('bets.bet').where({ id: betId }).del();
    await trx.commit();

    result.code = 0;
  } catch (err) {
    console.log(err.message);
    result.code = -1;
  }

  return result;
}
