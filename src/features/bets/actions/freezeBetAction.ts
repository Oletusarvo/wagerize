'use server';

import db from 'betting_app/dbconfig';
import { revalidatePath } from 'next/cache';
import { BetStatus } from '../constants/betStatus';

export async function freezeBetAction(betId: string, newState: boolean) {
  const bet = await db('bets.bet').where({ id: betId }).select('data').first();
  if (bet) {
    bet.data.status = newState === true ? BetStatus.FROZEN : BetStatus.ACTIVE;
    await db('bets.bet').where({ id: betId }).update(bet);
    revalidatePath('/auth/bets');
  }
}
