import { BetError } from '@/features/bets/error/BetError';
import { tablenames } from '@/tablenames';
import db from 'betting_app/dbconfig';

export async function verifyBetStatus(bet_id: string) {
  //Prevent bidding if the bet is not active or has expired.
  const betRecord = await db({ bet: tablenames.bet })
    .join(
      db.select('id', 'label').from(tablenames.bet_status).as('bet_status'),
      'bet_status.id',
      'bet.bet_status_id'
    )
    .whereIn(
      'bet.bet_status_id',
      db.select('id').from(tablenames.bet_status).whereIn('label', ['active', 'frozen'])
    )
    .andWhere({
      'bet.id': bet_id,
    })
    .andWhere('bet.expires_at', '<', new Date())
    .orWhere({ 'bet.expires_at': null })
    .select('bet.id', 'bet.currency_id', 'bet_status.label as status')
    .first();

  if (!betRecord) {
    return {
      success: false,
      error: BetError.EXPIRED,
    };
  } else if (betRecord.status === 'frozen') {
    return {
      success: false,
      error: BetError.FROZEN,
    };
  }

  return { success: true, bet: betRecord };
}
