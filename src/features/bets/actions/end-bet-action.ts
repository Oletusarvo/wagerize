'use server';

import db from 'betting_app/dbconfig';

import { TBetError } from '../error/bet-error';
import { dispatchWalletUpdate } from '@/features/wallets/util/dispatch-wallet-update';
import { loadSession } from '@/utils/load-session';
import { AuthError, TAuthError } from '@/features/auth/error/auth-error';
import { betService } from '../services/bet-service';
import { walletService } from '@/features/wallets/services/wallet-service';

export async function endBetAction(
  betId: string,
  outcomeId: string
): Promise<ActionResponse<void, TBetError | TAuthError>> {
  const trx = await db.transaction();
  try {
    const session = await loadSession();
    await betService.verifyAuthorShip(betId, session, trx);

    const results = await betService.endBet(betId, outcomeId, trx);

    //Update the wallets of each winner.
    const promises = results.winningWalletIds.map(id =>
      walletService.repo.incrementBalanceById(id, results.rewards.winnerShare, trx)
    );
    console.log(results);
    await Promise.all([
      promises,
      //Give the creator their share
      walletService.repo.incrementBalance(
        results.authorId,
        results.currencyId,
        results.rewards.creatorShare,
        trx
      ),
    ]);

    const creatorWallet = await walletService.repo
      .findBy({ user_id: results.authorId, currency_id: results.currencyId }, trx)
      .first();

    //Make sure the creator only appears once, in case they also won the bet.
    const updatedWallets = results.winningWalletIds
      .filter(id => id !== creatorWallet.id)
      .concat(creatorWallet.id);

    await trx.commit();
    await Promise.all(updatedWallets.map(id => dispatchWalletUpdate(id)));
    return {
      success: true,
    };
  } catch (err) {
    await trx.rollback();
    console.log(err.message);
    return {
      success: false,
      error: err.message,
    };
  }
}
