import { Service } from '@/utils/service';
import { WalletRepository } from '../repos/wallet-repository';
import { DBContext } from '@/db-context';
import { tablenames } from '@/tablenames';
import { WalletError } from '../error/wallet-error';
import { AuthError } from '@/features/auth/error/auth-error';

class WalletService extends Service<WalletRepository> {
  constructor(repo) {
    super(repo);
  }

  async verifyWalletOwnership(user_id: string, wallet_id: string, ctx: DBContext) {
    const walletRecord = await ctx(tablenames.wallet)
      .where({ user_id, id: wallet_id })
      .select('user_id')
      .first();
    if (!walletRecord) {
      throw new Error(AuthError.UNAUTHORIZED);
    }
  }
}

export const walletService = new WalletService(new WalletRepository());
