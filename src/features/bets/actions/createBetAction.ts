'use server';

import db from 'betting_app/dbconfig';
import { betSchema } from '../schemas/betSchema';
import { BetType } from '../types/BetType';
import { z } from 'zod';
import { getSession } from '@/utils/getSession';
import { revalidatePath } from 'next/cache';
import { BetError, WError } from '@/utils/error';
import { User } from '../../users/classes/User';
import { optionsSchema } from '../schemas/optionsSchema';

export async function createBetAction(payload: Omit<BetType, 'id' | 'created_at'>, opts: string[]) {
  let result: { code: string | number } = { code: 0 };
  const trx = await db.transaction();
  try {
    //Assign the current session user id as the author id.
    const session = await getSession();
    const user = new User({ id: session.user.id });
    await user.createBet(payload, opts, trx);
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
