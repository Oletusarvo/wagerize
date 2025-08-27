import db from 'betting_app/dbconfig';
import { getWallet } from '../dal/getWallet';
import { WalletError } from '../error/walletError';

export async function verifyWalletBalance(amount: number, user_id: string, currency_id: string) {
  const walletRecord = await getWallet(db)
    .where({
      user_id,
      currency_id,
    })
    .first();

  if (!walletRecord) {
    return {
      success: false,
      error: WalletError.NOT_FOUND,
    };
  } else if (walletRecord.current_balance < amount) {
    return {
      success: false,
      error: WalletError.INSUFFICIENT_FUNDS,
    };
  }
  return { success: true };
}
