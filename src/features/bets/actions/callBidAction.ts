'use server';

import db from 'betting_app/dbconfig';
import { Bet } from '../classes/Bet';

export async function raiseBidAction(bet_id: string, bid_id: string, amount: number) {
  const trx = await db.transaction();
  try {
    const bet = await Bet.load(bet_id, trx);
    await bet.raiseBid(bid_id, amount, trx);
    await bet.save(trx);
    await trx.commit();
  } catch (err) {
    await trx.rollback();
    return -1;
  }
}
