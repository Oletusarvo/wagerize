import { tablenames } from '@/tablenames';
import db from 'betting_app/dbconfig';
import { Knex } from 'knex';

export async function verifyBetQuota(session: TODO, ctx: Knex | Knex.Transaction) {
  const maxBetCountRecord = await ctx({ user_subscription: tablenames.user_subscription })
    .where({
      id: db
        .select('user_subscription_id')
        .from(tablenames.user)
        .where({ id: session.user.id })
        .limit(1),
    })
    .select('user_subscription.max_bets')
    .first();

  if (maxBetCountRecord) {
    const betCount = await getAuthoredBetCount(session.user.id, ctx);
    if (betCount >= parseInt(maxBetCountRecord.max_bets)) {
      return true;
    }
  }
  return false;
}

async function getAuthoredBetCount(user_id: string, ctx: Knex | Knex.Transaction) {
  const [{ count }] = await ctx(tablenames.bet).where({ author_id: user_id }).count('* as count');
  return typeof count === 'string' ? parseInt(count) : count;
}
