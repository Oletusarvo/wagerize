import db from 'betting_app/dbconfig';
import { getBid } from '../../dal/getBid';
import { io } from '@/features/io/lib/io';

export async function dispatchBidUpdate(user_id: string, bet_id: string) {
  const newBid = await getBid(db)
    .where({ user_id, bet_id })
    .select('user_id', 'amount', 'bet_id', 'outcome')
    .first();

  io.dispatch({
    to: `bet:${bet_id}`,
    message: 'bet:bid_placed',
    payload: newBid,
  });
}
