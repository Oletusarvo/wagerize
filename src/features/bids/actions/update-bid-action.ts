'use server';

import { io } from '@/features/io/lib/io';
import { tablenames } from '@/tablenames';
import { loadSession } from '@/utils/load-session';
import { parseFormDataUsingSchema } from '@/utils/parse-form-data-using-schema';
import db from 'betting_app/dbconfig';
import z from 'zod';
import { bidService } from '../services/bid-service';
import { walletService } from '@/features/wallets/services/wallet-service';

const updateBidSchema = z.object({
  id: z.uuid(),
  status: z.enum(['folded', 'active']).optional(),
  amount: z.int().optional(),
});

export async function updateBidAction(payload: FormData): Promise<ActionResponse<void, string>> {
  const data = parseFormDataUsingSchema(payload, updateBidSchema);

  const parsedPayload = data;

  const session = await loadSession();
  const bidRecord = await bidService.repo.findById(data.id, db);
  await walletService.verifyWalletOwnership(session.user.id, bidRecord.wallet_id, db);
  await bidService.repo.update(
    parsedPayload.id,
    {
      amount: parsedPayload.amount,
      bid_status_id: db
        .select('id')
        .from(tablenames.bid_status)
        .where({ label: parsedPayload.status })
        .limit(1),
    },
    db
  );

  io.dispatch({
    message: 'bid:update',
    payload: {
      id: parsedPayload.id,
      status: parsedPayload.status,
    },
  });
  return { success: true };
}
