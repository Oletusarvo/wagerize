'use server';

import { parseFormDataUsingSchema } from '@/utils/parse-form-data-using-schema';
import { bidSchema } from '../../bids/schemas/bid-schema';
import { TBidError } from '../../bids/error/bid-error';
import db from 'betting_app/dbconfig';
import { loadSession } from '@/utils/load-session';
import { BetError } from '@/features/bets/error/bet-error';
import { TWalletError } from '@/features/wallets/error/wallet-error';
import { dispatchBetUpdate } from '../utils/dispatch-bet-update';
import { dispatchBidUpdate } from '@/features/bids/actions/util/dispatch-bid-update';
import { dispatchWalletUpdate } from '@/features/wallets/util/dispatch-wallet-update';
import { bidService } from '@/features/bids/services/bid-service';
import { betService } from '../services/bet-service';
import { walletService } from '@/features/wallets/services/wallet-service';

export async function placeBidAction(
  payload: FormData
): Promise<
  ActionResponse<
    void,
    TBidError | TWalletError | (typeof BetError)['EXPIRED'] | (typeof BetError)['FROZEN']
  >
> {
  const trx = await db.transaction();
  try {
    const session = await loadSession();
    await bidService.verifyBidQuota(session.user.id, trx);
    const bid = parseFormDataUsingSchema(payload, bidSchema);

    const currencyId = await betService.repo.getCurrencyId(bid.bet_id, trx);
    const walletId = await walletService.repo.getId(session.user.id, currencyId, trx);
    await betService.placeBid(
      {
        ...bid,
        wallet_id: walletId,
      },
      trx
    );
    await walletService.repo.incrementBalance(session.user.id, currencyId, -bid.amount, trx);

    await trx.commit();
    await Promise.all([
      dispatchBetUpdate(bid.bet_id),
      dispatchBidUpdate(session.user.id, bid.bet_id),
      dispatchWalletUpdate(walletId),
    ]);

    return {
      success: true,
    };
  } catch (err) {
    trx.rollback();
    return {
      success: false,
      error: err.message,
    };
  }
}
