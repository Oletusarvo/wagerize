'use server';

import db from 'betting_app/dbconfig';
import { betSchema } from '../schemas/betSchema';
import { BetType } from '../types/BetType';

export async function createBetAction(payload: Omit<BetType, 'id' | 'created_at'>) {
  let result: { code: string | number } = { code: 0 };
  try {
    const parsedPayload = betSchema.parse(payload);
    await db('bets.bet').insert(parsedPayload);
  } catch (err) {
    console.log(err.message);
    result.code = 'unknown';
  }
  return result;
}
