'use server';

import { addNotificationAction } from '@/features/notifications/schemas/actions/addNotificationAction';
import { getSession } from '@/utils/getSession';
import db from 'betting_app/dbconfig';
import { BetStatus } from '../constants/betStatus';
import { Knex } from 'knex';

export async function endBetAction(betId: string, outcomeId: string) {
  let result: { code: number | string } = {
    code: 0,
  };
  const trx = await db.transaction();
  try {
    //Get the winning participant wallets.
    const winningWallets = await trx('users.wallet as wallet')
      .leftJoin(db.raw('bets.bid as bid on bid.bet_id = ?', [betId]))
      .whereRaw('bid.outcome_id = ? AND bid.wallet_id = wallet.id', [outcomeId])
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
        await trx('users.wallet').where({ id: wallet.id }).increment('balance', winnerShare)
    );
    await Promise.all(promises);

    //Give the creator their share.
    const [author_id] = await trx('bets.bet')
      .where({ id: betId })
      .select('author_id')
      .pluck('author_id');

    await trx('users.wallet').where({ user_id: author_id }).increment('balance', creatorShare);

    await resolveBet(betId, outcomeId, trx);

    await trx.commit();

    result.code = 0;
  } catch (err) {
    await trx.rollback();
    console.log(err.message);
    result.code = -1;
  }

  return result;
}

/**Creates a database-entry for the result of a resolved bet. Deletes the oldest result if a MAX_RESULTS env-variable is defined. */
async function createResult(betId: string, outcomeId: string, ctx: Knex.Transaction) {
  await ctx('bets.result').insert({
    bet_id: betId,
    outcome_id: outcomeId,
  });

  const MAX_RESULTS = process.env.MAX_RESULTS;
  if (MAX_RESULTS) {
    const [{ resultCount }] = await ctx('bets.result').count('* as resultCount');
    const countAsNumber = typeof resultCount === 'string' ? parseInt(resultCount) : resultCount;

    if (countAsNumber >= parseInt(MAX_RESULTS)) {
      await ctx('bets.result').orderBy('resolved_at', 'asc').first().del();
    }
  }
}

/**If the deletePermanently-argument is false, Sets the data.status property of a bet to BetStatus.RESOLVED, instead of deleting it, and creates a result-entry on the database.
 */
async function resolveBet(
  betId: string,
  outcomeId: string,
  ctx: Knex.Transaction,
  deletePermanently: boolean = true
) {
  if (deletePermanently) {
    await ctx('bets.bet').where({ id: betId }).del();
  } else {
    const [{ currentData }] = await ctx('bets.bet')
      .where({ id: betId })
      .select('data as currentData');
    await ctx('bets.bet')
      .where({ id: betId })
      .update({
        data: {
          ...currentData,
          status: BetStatus.RESOLVED,
        },
      });
    await createResult(betId, outcomeId, ctx);
  }
}
