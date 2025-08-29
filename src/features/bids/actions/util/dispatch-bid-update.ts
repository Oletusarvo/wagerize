import db from 'betting_app/dbconfig';
import { getBid } from '../../dal/get-bid';
import { io } from '@/features/io/lib/io';
import { bidService } from '../../services/bid-service';

export async function dispatchBidUpdate(user_id: string, bet_id: string) {
  const newBid = await bidService.repo.findBy({ user_id, bet_id }, db).first();

  io.dispatch({
    to: `bet:${bet_id}`,
    message: 'bet:bid_placed',
    payload: newBid,
  });
}
