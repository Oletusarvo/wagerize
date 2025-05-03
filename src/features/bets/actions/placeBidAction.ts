'use server';

import { BetError } from '@/utils/error';
import { getSession } from '@/utils/getSession';
import db from 'betting_app/dbconfig';
import { revalidatePath } from 'next/cache';
import { Bets } from '../DAL/Bets';

export async function placeBidAction(payload: any) {
  let result: { code: number | string } = { code: 0 };
  const trx = await db.transaction();
  try {
    const session = await getSession();

    /*Include the user's wallet id with the required currency, and insert the bid.
     * Currently only supports the default DICE currency.
     */
    const [bet] = await trx('bets.bet')
      .where({ id: payload.bet_id })
      .select('currency_id', 'expires_at');
    const { currency_id, expires_at } = bet;

    //Prevent bidding if the bet is expired.
    const now = Date.now();
    if (expires_at && now >= new Date(expires_at).getTime()) {
      throw new Error(BetError.EXPIRED);
    }

    const [walletId] = await trx('users.wallet')
      .where({
        user_id: session.user.id,
        currency_id,
      })
      .pluck('id');

    payload.wallet_id = walletId;

    //Get the current bid on the bet, if one exists.
    const [bid] = await trx('bets.bid').where({ wallet_id: walletId, bet_id: payload.bet_id });

    if (!bid) {
      //No bid placed yet.

      //Prevent bidding if the user already has participated in the maximum allowed number of bets.
      await checkMaxBids(walletId);

      await trx('bets.bid').insert(payload);
    } else {
      if (bid.is_folded) {
        throw new Error(BetError.FOLDED);
      } else if (bet.data.min_raise) {
        await trx('bets.bid').where({ id: bid.id }).increment('amount', payload.amount);
      } else {
        throw new Error(BetError.NO_RAISE);
      }
    }

    //Decrement the user's wallet balance.
    await trx('users.wallet').where({ id: walletId }).decrement('balance', payload.amount);

    //Commit
    await trx.commit();

    //Send an update of the game state through socket.io to all users displaying the bet currently.
    if (global.io) {
      const room = `bet-${payload.bet_id}`;
      const [currentGameData] = await db('bets.bet')
        .join(db.raw('bets.bid as bid on bid.bet_id = bets.bet.id'))
        .where({ 'bets.bet.id': payload.bet_id })
        .select(db.raw('SUM(bid.amount) as pool'));

      (global.io as any).to(room).emit('game_update', currentGameData);
    }
    revalidatePath('/auth/bets');
  } catch (err) {
    await trx.rollback();
    const msg = err.message;
    if (msg === BetError.MAX_BIDS || msg === BetError.EXPIRED) {
      result.code = msg;
    } else {
      console.log(err.message);
      result.code = -1;
    }
  }
  return result;
}

export async function checkMaxBids(walletId: string) {
  const maxBids = process.env.MAX_BIDS;
  if (!maxBids) return;

  const [{ count }] = await db('bets.bid').where({ wallet_id: walletId }).count('* as count');
  const bidCount = typeof count === 'string' ? parseInt(count) : count;

  if (bidCount >= parseInt(maxBids)) {
    throw new Error(BetError.MAX_BIDS);
  }
}
