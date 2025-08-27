import { getPool } from '@/features/bets/DAL/getPool';
import { io } from '@/features/io/lib/io';
import { tablenames } from '@/tablenames';
import db from 'betting_app/dbconfig';
import { getBid } from '../../dal/getBid';

export async function dispatchBetUpdate(user_id: string, bet_id: string) {
  const metadataRecord = await db(tablenames.bet_metadata)
    .where({ bet_id })
    .select('min_bid')
    .first();

  const currentPoolRecord = await getPool(db).where({ id: bet_id }).first();

  io.dispatch({
    to: `bet:${bet_id}`,
    message: 'bet:update',
    payload: {
      pool: parseInt(currentPoolRecord.pool),
      min_bid: metadataRecord.min_bid,
      id: bet_id,
    },
  });

  const newBid = await getBid(db)
    .where({ user_id, bet_id })
    .select('user_id', 'amount', 'bet_id')
    .first();

  io.dispatch({
    to: `bet:${bet_id}`,
    message: 'bet:bid_placed',
    payload: newBid,
  });
}
