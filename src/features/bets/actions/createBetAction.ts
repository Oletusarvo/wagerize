'use server';

import db from 'betting_app/dbconfig';
import { betSchema } from '../schemas/betSchema';
import { BetType } from '../types/BetType';
import { z } from 'zod';
import { getSession } from '@/utils/getSession';
import { revalidatePath } from 'next/cache';

const optionsSchema = z.array(z.string().nonempty()).nonempty();
export async function createBetAction(payload: Omit<BetType, 'id' | 'created_at'>, opts: string[]) {
  let result: { code: string | number } = { code: 0 };
  const trx = await db.transaction();
  try {
    //Assign the current session user id as the author id.
    const session = await getSession();
    payload.author_id = session.user.id;

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
    console.log(err.message);
    result.code = 'unknown';
  }
  return result;
}
