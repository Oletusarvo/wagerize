'use server';

import { getSession } from '@/utils/getSession';
import db from 'betting_app/dbconfig';

/**@deprecated */
export async function getParticipationStatusAction(betId: string) {
  const session = await getSession();
  const bid = await db('bets.bid')
    .where({ user_id: session.user.id, bet_id: betId })
    .select('id')
    .first();
  return bid !== undefined;
}
