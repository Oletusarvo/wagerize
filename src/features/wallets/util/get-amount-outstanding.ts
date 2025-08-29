import { DBContext } from '@/db-context';
import { tablenames } from '@/tablenames';

/**@deprecated */
export async function getAmountOutstanding(wallet_id: string, ctx: DBContext) {
  const sumResult = await ctx({ bid: tablenames.bid })
    .join(
      ctx.select('id').from(tablenames.wallet).groupBy('id').as('wallet'),
      'wallet.id',
      'bid.wallet_id'
    )
    .where({ 'wallet.id': wallet_id })
    .sum('bid.amount as total')
    .first();

  return sumResult.total;
}
