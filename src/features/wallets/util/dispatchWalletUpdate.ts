import db from 'betting_app/dbconfig';
import { getWallet } from '../dal/getWallet';
import { tablenames } from '@/tablenames';
import { io } from '@/features/io/lib/io';

export async function dispatchWalletUpdate(wallet_id: string) {
  const wallet = await db(tablenames.wallet)
    .where({
      id: wallet_id,
    })
    .first();

  console.log('Dispatching wallet update to: ', wallet);
  io.dispatch({
    //to: `wallet:${wallet.id}`,
    message: 'wallet:update',
    payload: {
      id: wallet.id,
      balance: wallet.balance,
    },
  });
}
