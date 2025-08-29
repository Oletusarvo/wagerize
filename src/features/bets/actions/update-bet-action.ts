'use server';

import { parseFormDataUsingSchema } from '@/utils/parse-form-data-using-schema';
import { betSchema } from '../schemas/bet-schema';
import { TBetError } from '../error/bet-error';
import db from 'betting_app/dbconfig';
import { tablenames } from '@/tablenames';
import z from 'zod';
import { io } from '@/features/io/lib/io';
import { betService } from '../services/bet-service';

const updateBetSchema = betSchema.partial().extend(
  z.object({
    id: z.uuid(),
    status: z.enum(['frozen', 'active', 'ended']).optional(),
  }).shape
);

export async function updateBetAction(payload: FormData): Promise<ActionResponse<void, TBetError>> {
  const trx = await db.transaction();
  try {
    const bet = parseFormDataUsingSchema(payload, updateBetSchema);
    await betService.repo.updateMetadata(bet, trx);
    await betService.repo.update(
      {
        bet_status_id:
          bet.status &&
          db.select('id').from(tablenames.bet_status).where({ label: bet.status }).limit(1),
      },
      trx
    );

    const updatedBetRecord = await betService.repo.findById(bet.id, trx);
    io.dispatch({
      message: 'bet:update',
      payload: updatedBetRecord,
    });

    return { success: true };
  } catch (err) {
    await trx.rollback();
    return {
      success: false,
      error: err.message,
    };
  }
}
