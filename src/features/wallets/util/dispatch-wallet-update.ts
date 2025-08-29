import db from 'betting_app/dbconfig';
import { io } from '@/features/io/lib/io';
import { walletService } from '../services/wallet-service';

export async function dispatchWalletUpdate(wallet_id: string) {
  const wallet = await walletService.repo.findBy({ id: wallet_id }, db).first();

  io.dispatch({
    //to: `wallet:${wallet.id}`,
    message: 'wallet:update',
    payload: {
      id: wallet.id,
      balance: wallet.balance,
    },
  });
}
