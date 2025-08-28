'use server';

import { parseFormDataUsingSchema } from '@/utils/parseUsingSchema';
import { bidSchema } from '../../bids/schemas/bidSchema';
import { getParseResultErrorMessage } from '@/utils/getParseResultErrorMessage';
import { TBidError } from '../../bids/error/BidError';
import db from 'betting_app/dbconfig';
import { loadSession } from '@/utils/getSession';
import { BetError } from '@/features/bets/error/BetError';
import { TWalletError } from '@/features/wallets/error/walletError';
import { dispatchBetUpdate } from '../../bids/actions/util/dispatchBetUpdate';
import { Bet } from '@/features/bets/lib/Bet';
import { dispatchBidUpdate } from '@/features/bids/actions/util/dispatchBidUpdate';
import { dispatchWalletUpdate } from '@/features/wallets/util/dispatchWalletUpdate';
import { getWallet } from '@/features/wallets/dal/getWallet';
import { tablenames } from '@/tablenames';

export async function placeBidAction(
  payload: FormData
): Promise<
  ActionResponse<
    void,
    TBidError | TWalletError | (typeof BetError)['EXPIRED'] | (typeof BetError)['FROZEN']
  >
> {
  const session = await loadSession();

  const parseResult = parseFormDataUsingSchema(payload, bidSchema);
  if (!parseResult.success) {
    console.log(parseResult.error);
    return {
      success: false,
      error: getParseResultErrorMessage(parseResult),
    };
  }

  const trx = await db.transaction();
  try {
    const bid = parseResult.data;
    const bet = await Bet.load(bid.bet_id, trx);
    const result = await bet.placeBid(session, bid, trx);
    if (!result.success) {
      return {
        success: false,
        error: result.error,
      };
    }

    const [wallet] = await trx(tablenames.wallet)
      .where({ user_id: session.user.id, currency_id: bet.data.currency_id })
      .decrement('balance', bid.amount)
      .returning('id');

    await trx.commit();

    await Promise.all([
      dispatchBetUpdate(bid.bet_id),
      dispatchBidUpdate(session.user.id, bid.bet_id),
      dispatchWalletUpdate(wallet.id),
    ]);

    return {
      success: true,
    };
  } catch (err) {
    trx.rollback();
    throw err;
  }
}
