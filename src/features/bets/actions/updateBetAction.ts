'use server';

import { parseFormDataUsingSchema } from '@/utils/parseUsingSchema';
import { betSchema } from '../schemas/betSchema';
import { getParseResultErrorMessage } from '@/utils/getParseResultErrorMessage';
import { TBetError } from '../error/BetError';
import db from 'betting_app/dbconfig';
import { tablenames } from '@/tablenames';
import z from 'zod';
import { io } from '@/features/io/lib/io';
import { getBet } from '../DAL/getBet';

const updateBetSchema = betSchema.partial().extend(
  z.object({
    id: z.uuid(),
    status: z.enum(['frozen', 'active', 'ended']).optional(),
  }).shape
);

export async function updateBetAction(payload: FormData): Promise<ActionResponse<void, TBetError>> {
  const parseResult = parseFormDataUsingSchema(payload, updateBetSchema);
  if (!parseResult.success) {
    return {
      success: false,
      error: getParseResultErrorMessage(parseResult),
    };
  }

  const data = parseResult.data;
  await db(tablenames.bet)
    .where({ id: data.id })
    .update({
      bet_status_id:
        data.status &&
        db.select('id').from(tablenames.bet_status).where({ label: data.status }).limit(1),
    })
    .returning('id');

  const updatedBetRecord = await getBet(db).where({ id: data.id }).first();
  io.dispatch({
    message: 'bet:update',
    payload: updatedBetRecord,
  });

  return { success: true };
}
