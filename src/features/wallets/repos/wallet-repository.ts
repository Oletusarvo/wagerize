import { DBContext } from '@/db-context';
import { tablenames } from '@/tablenames';

export class WalletRepository {
  async incrementBalance(user_id: string, currency_id: string, amount: number, ctx: DBContext) {
    return await ctx(tablenames.wallet)
      .where({ user_id, currency_id })
      .increment('balance', amount);
  }

  async incrementBalanceById(id: string, amount: number, ctx: DBContext) {
    return await ctx(tablenames.wallet).where({ id }).increment('balance', amount);
  }

  /**Returns the id of the wallet with the provided user- and currency ids. */
  async getId(user_id: string, currency_id: string, ctx: DBContext) {
    const [result] = await ctx(tablenames.wallet).where({ user_id, currency_id }).pluck('id');
    return result;
  }

  findBy(query: any, ctx: DBContext) {
    return ctx(tablenames.wallet).where(query);
  }
}
