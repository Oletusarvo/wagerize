'use server';

import { AuthError } from '@/features/auth/error/AuthError';
import { io } from '@/features/io/lib/io';
import { verifyWalletOwnership } from '@/features/wallets/util/verifyWalletOwnership';
import { tablenames } from '@/tablenames';
import { getParseResultErrorMessage } from '@/utils/getParseResultErrorMessage';
import { loadSession } from '@/utils/getSession';
import { parseFormDataUsingSchema } from '@/utils/parseUsingSchema';
import db from 'betting_app/dbconfig';
import z from 'zod';

const updateBidSchema = z.object({
  id: z.uuid(),
  status: z.enum(['folded', 'active']).optional(),
  amount: z.int().optional(),
});

export async function updateBidAction(payload: FormData): Promise<ActionResponse<void, string>> {
  const parseResult = parseFormDataUsingSchema(payload, updateBidSchema);
  if (!parseResult.success) {
    return {
      success: false,
      error: getParseResultErrorMessage(parseResult),
    };
  }
  const parsedPayload = parseResult.data;
  console.log(parsedPayload);

  const session = await loadSession();
  const bidRecord = await db(tablenames.bid)
    .where({ id: parsedPayload.id })
    .select('wallet_id')
    .first();
  console.log(session.user);
  const isWalletOwner = await verifyWalletOwnership(session, bidRecord.wallet_id, db);
  if (!isWalletOwner) {
    return {
      success: false,
      error: AuthError.UNAUTHORIZED,
    };
  }

  await db(tablenames.bid)
    .where({ id: parsedPayload.id })
    .update({
      amount: parsedPayload.amount,
      bid_status_id: db
        .select('id')
        .from(tablenames.bid_status)
        .where({ label: parsedPayload.status })
        .limit(1),
    });

  io.dispatch({
    message: 'bid:update',
    payload: {
      id: parsedPayload.id,
      status: parsedPayload.status,
    },
  });
  return { success: true };
}
