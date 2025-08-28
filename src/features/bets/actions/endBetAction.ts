'use server';

import db from 'betting_app/dbconfig';

import { Knex } from 'knex';
import { BetError, TBetError } from '../error/BetError';
import { tablenames } from '@/tablenames';
import { getPool } from '../DAL/getPool';
import { getWallet } from '@/features/wallets/dal/getWallet';
import { dispatchWalletUpdate } from '@/features/wallets/util/dispatchWalletUpdate';
import { loadSession } from '@/utils/getSession';
import { getBet } from '../DAL/getBet';
import { AuthError, TAuthError } from '@/features/auth/error/AuthError';
import { resolveWalletBalance } from '@/features/wallets/util/resolveWalletBalance';
import { getAmountOutstanding } from '@/features/wallets/util/getAmountOutstanding';

export async function endBetAction(
  betId: string,
  outcomeId: string
): Promise<ActionResponse<void, TBetError | TAuthError>> {
  const trx = await db.transaction();
  try {
    const session = await loadSession();
    //Only allow the author to end the bet.
    const betRecord = await getBet(db).where({ author_id: session.user.id, id: betId }).first();
    if (!betRecord) {
      return {
        success: false,
        error: AuthError.UNAUTHORIZED,
      };
    } else if (Date.now() < new Date(betRecord.expires_at).getTime()) {
      return {
        success: false,
        error: BetError.ACTIVE,
      };
    }

    //Get the winning participant wallets.
    const winningWallets = await trx({ bid: tablenames.bid })
      .join(trx.select('id').from(tablenames.wallet).as('wallet'), 'wallet.id', 'bid.wallet_id')
      .where({ 'bid.outcome_id': outcomeId })
      .select('wallet.id')
      .groupBy('wallet.id');

    //Get the pool
    const poolRecord = await getPool(trx).first();

    if (!poolRecord) {
      throw new Error('Failed to sum bid amounts!');
    }

    const pool = poolRecord.pool;

    //Determine the share of the pool given to the creator.
    const numWinners = winningWallets.length;
    const creatorShare = pool % (numWinners || 1);

    //Calculate the share given to each winner.
    const winnerShare = numWinners > 0 ? (pool - creatorShare) / numWinners : 0;

    //Update the wallets of each winner.
    const promises = winningWallets.map(wallet =>
      trx(tablenames.wallet).where({ id: wallet.id }).increment('balance', winnerShare)
    );

    await Promise.all(promises);
    //Give the creator their share.
    const [creatorWalletRecord] = await trx(tablenames.wallet)
      .where({ user_id: betRecord.author_id, currency_id: betRecord.currency_id })
      .increment('balance', creatorShare)
      .returning('id');

    await resolveBet(betId, outcomeId, trx);

    await trx.commit();
    //Make sure the creator only appears once, in case they also won the bet.
    const updatedWallets = winningWallets
      .filter(w => w.id !== creatorWalletRecord.id)
      .concat(creatorWalletRecord);

    await Promise.all(updatedWallets.map(w => dispatchWalletUpdate(w.id)));
    return {
      success: true,
    };
  } catch (err) {
    await trx.rollback();
    console.log(err.message);
    throw err;
  }
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
          status: ctx
            .select('id')
            .from(tablenames.bet_status)
            .where({ label: 'resolved' })
            .limit(1),
        },
      });
    //await createResult(betId, outcomeId, ctx);
  }
}
