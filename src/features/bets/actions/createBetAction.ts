'use server';

import db from 'betting_app/dbconfig';
import { betSchema } from '../schemas/betSchema';
import { loadSession } from '@/utils/getSession';
import { parseFormDataUsingSchema } from '@/utils/parseUsingSchema';
import { getParseResultErrorMessage } from '@/utils/getParseResultErrorMessage';
import { Knex } from 'knex';
import { tablenames } from '@/tablenames';
import { BetError } from '../error/BetError';
import { verifyBetQuota } from './util/verifyBetQuota';

export async function createBetAction(payload: FormData): Promise<ActionResponse<void, string>> {
  const session = await loadSession();
  if (await verifyBetQuota(session, db)) {
    return {
      success: false,
      error: BetError.QUOTA_REACHED,
    };
  }

  const parsedBetResult = parseFormDataUsingSchema(payload, betSchema);
  if (!parsedBetResult.success) {
    console.log(parsedBetResult.error);
    return {
      success: false,
      error: getParseResultErrorMessage(parsedBetResult),
    };
  }

  const trx = await db.transaction();
  try {
    const data = parsedBetResult.data;
    //Save the core bet data.
    const [{ id: betId }] = await trx(tablenames.bet).insert(
      {
        created_at: new Date(),
        expires_at: data.expires_at,
        currency_id: db.select('id').from(tablenames.currency).where({ symbol: 'dice' }).limit(1),
        author_id: session.user.id,
      },
      'id'
    );

    //Save the metadata
    await trx(tablenames.bet_metadata).insert({
      bet_id: betId,
      title: data.title,
      description: data.description,
      min_raise: data.min_raise,
      min_bid: data.min_bid,
      max_raise: data.max_raise,
    });

    //Save the options
    await trx(tablenames.bet_option).insert(
      data.outcomes.map(outcome => ({ label: outcome, bet_id: betId }))
    );
    await trx.commit();

    return { success: true };
  } catch (err) {
    await trx.rollback();
    console.log(err.message);
    throw err;
  }
}
