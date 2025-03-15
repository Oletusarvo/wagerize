'use server';

import db from 'betting_app/dbconfig';
import { betSchema } from '../schemas/betSchema';
import { BetType } from '../types/BetType';
import { z } from 'zod';
import { getSession } from '@/utils/getSession';
import { revalidatePath } from 'next/cache';
import { BetError, WError } from '@/utils/error';

const optionsSchema = z.array(z.string().nonempty()).nonempty();
export async function createBetAction(payload: Omit<BetType, 'id' | 'created_at'>, opts: string[]) {
  let result: { code: string | number } = { code: 0 };
  const trx = await db.transaction();
  try {
    //Make sure the outcomes don't exceed the quota.
    const maxOutcomes = process.env.MAX_OUTCOMES;
    if (opts.length > parseInt(maxOutcomes)) {
      throw new Error(BetError.MAX_OUTCOMES);
    }

    //Assign the current session user id as the author id.
    const session = await getSession();
    payload.author_id = session.user.id;

    //Prevent bet creation if the user has hit their quota.
    await checkBetQuota(session.user.id);

    //Validate the bet data.
    const [currencyId] = await trx('users.currency').where({ symbol: 'DICE' }).pluck('id');
    payload.currency_id = currencyId;
    const parsedPayload = betSchema.parse(payload);
    optionsSchema.parse(opts);

    //Insert the new bet into the database.
    const [{ id }] = await trx('bets.bet').insert(parsedPayload).returning('id');
    await trx('bets.outcome').insert(opts.map(opt => ({ label: opt, bet_id: id })));
    await trx.commit();
    revalidatePath('/auth/bets');
  } catch (err) {
    await trx.rollback();
    const msg = err.message;
    if (msg === WError.QUOTA_FULL || msg === BetError.MAX_OUTCOMES) {
      result.code = msg;
    } else {
      console.log(msg);
      result.code = -1;
    }
  }
  return result;
}

async function checkBetQuota(user_id: string) {
  const maxBets = process.env.MAX_BETS;
  if (!maxBets) return;

  const [{ count }] = await db('bets.bet').where({ author_id: user_id }).count('* as count');
  const numBets = typeof count === 'string' ? parseInt(count) : count;

  if (maxBets && numBets >= parseInt(maxBets)) {
    throw new Error(WError.QUOTA_FULL);
  }
}
