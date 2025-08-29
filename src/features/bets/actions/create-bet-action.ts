'use server';

import db from 'betting_app/dbconfig';
import { betSchema } from '../schemas/bet-schema';
import { loadSession } from '@/utils/load-session';
import { parseFormDataUsingSchema } from '@/utils/parse-form-data-using-schema';
import { tablenames } from '@/tablenames';
import { betService } from '../services/bet-service';

export async function createBetAction(payload: FormData): Promise<ActionResponse<void, string>> {
  const trx = await db.transaction();
  try {
    const session = await loadSession();
    await betService.verifyBetQuota(session.user.id, trx);
    const data = parseFormDataUsingSchema(payload, betSchema);

    //Save the core bet data.
    const [{ id: betId }] = await betService.repo.create(
      {
        created_at: new Date(),
        expires_at: data.expires_at,
        currency_id: db.select('id').from(tablenames.currency).where({ symbol: 'dice' }).limit(1),
        author_id: session.user.id,
        bet_status_id: db
          .select('id')
          .from(tablenames.bet_status)
          .where({ label: 'active' })
          .limit(1),
      },
      trx
    );

    //Save the metadata
    await betService.repo.createMetadata(
      {
        bet_id: betId,
        title: data.title,
        description: data.description,
        min_raise: data.min_raise,
        min_bid: data.min_bid,
        max_raise: data.max_raise,
      },
      trx
    );

    //Save the options
    await betService.repo.createOptions(
      data.outcomes.map(outcome => ({ label: outcome, bet_id: betId })),
      trx
    );

    await trx.commit();

    return { success: true };
  } catch (err) {
    await trx.rollback();
    return {
      success: false,
      error: err.message,
    };
  }
}
