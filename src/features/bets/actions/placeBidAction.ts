'use server';

import { BetError } from '@/utils/error';
import { getSession } from '@/utils/getSession';
import db from 'betting_app/dbconfig';
import { revalidatePath } from 'next/cache';
import { Bet } from '../classes/Bet';
import { tablenames } from '@/tablenames';
import { User } from '../../users/classes/User';

export async function placeBidAction(payload: any) {
  let result: { code: number | string } = { code: 0 };
  const trx = await db.transaction();
  try {
    const session = await getSession();
    const user = new User({ id: session.user.id });
    const bet = await Bet.load(payload.bet_id, trx);

    payload.wallet_id = await user.getWalletId(bet.currencyId, trx);
    await user.validateBidCount(trx);
    await bet.placeBid(payload, trx);

    //Decrement the user's wallet balance.
    await user.decrementWalletBalance(bet.currencyId, payload.amount, trx);

    //Commit
    await bet.save(trx);
    await trx.commit();

    //Send an update of the game state through socket.io to all users displaying the bet currently.
    if (global.io) {
      const room = `bet-${payload.bet_id}`;
      const [currentGameData] = await db('bets.bet')
        .join(db.raw('bets.bid as bid on bid.bet_id = bets.bet.id'))
        .where({ 'bets.bet.id': payload.bet_id })
        .select(db.raw('CAST(SUM(bid.amount) as INTEGER) as pool'));

      (global.io as any).to(room).emit('game_update', currentGameData);
    }
    revalidatePath('/auth/bets');
  } catch (err) {
    await trx.rollback();
    const msg = err.message;
    if (
      msg === BetError.MAX_BIDS ||
      msg === BetError.EXPIRED ||
      msg === BetError.BID_ALREADY_PLACED ||
      msg === BetError.BID_TOO_SMALL ||
      msg === BetError.RAISE_TOO_LARGE ||
      msg === BetError.RAISE_TOO_SMALL
    ) {
      result.code = msg;
    } else {
      console.log(err.message);
      result.code = -1;
    }
  }
  return result;
}

export async function checkMaxBids(userId: string) {
  const maxBids = process.env.MAX_BIDS;
  if (!maxBids) return;

  const [{ count }] = await db(tablenames.bids)
    .join(
      db.raw('?? on ??.id = ??.user_id', [tablenames.users, tablenames.users, tablenames.wallets])
    )
    .where(`${tablenames.wallets}.user_id`, userId)
    .count('* as count');
  const bidCount = typeof count === 'string' ? parseInt(count) : count;

  if (bidCount >= parseInt(maxBids)) {
    throw new Error(BetError.MAX_BIDS);
  }
}
