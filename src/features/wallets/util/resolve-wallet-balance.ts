import { DBContext } from '@/db-context';
import { tablenames } from '@/tablenames';

/**@deprecated */
export async function resolveWalletBalance(
  opts: {
    wallet_id: string;
    bet_id: string;
    increment_by: number;
  },
  ctx: DBContext
) {
  const { wallet_id, bet_id, increment_by } = opts;
  await ctx(tablenames.wallet).where({ id: wallet_id }).increment('balance', increment_by);

  await ctx(tablenames.wallet)
    .where({ id: wallet_id })
    .update({
      balance: ctx.raw(
        'balance - (SELECT COALESCE(SUM(amount), 0) AS total FROM ?? WHERE wallet_id = ? AND bet_id = ?)',
        [tablenames.bid, wallet_id, bet_id]
      ),
    });
}
