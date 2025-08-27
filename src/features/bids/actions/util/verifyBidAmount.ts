import { TBet } from '@/features/bets/schemas/betSchema';
import { TBid } from '../../schemas/bidSchema';
import db from 'betting_app/dbconfig';
import { tablenames } from '@/tablenames';
import { BidError } from '../../error/BidError';

export async function verifyBidAmount(amount: number, bet_id: string) {
  const betMetadataRecord = await db(tablenames.bet_metadata)
    .where({ bet_id })
    .select('min_bid', 'min_raise', 'max_raise')
    .first();

  const { min_bid, min_raise, max_raise } = betMetadataRecord;
  //Prevent bidding if the bid amount is too small
  if (amount < min_bid) {
    return {
      success: false,
      error: BidError.BID_TOO_SMALL,
    };
  }

  if (amount > min_bid) {
    const difference = amount - min_bid;
    console.log('Min bid: ', min_bid, 'Amount: ', amount, 'Difference: ', difference);
    //Prevent bidding if raising by too little
    if (min_raise && difference < min_raise) {
      return {
        success: false,
        error: BidError.RAISE_TOO_SMALL,
      };
    }

    //Prevent bidding if raising by too much
    if (max_raise && difference > max_raise) {
      return {
        success: false,
        error: BidError.RAISE_TOO_LARGE,
      };
    }
  }

  return {
    success: true,
  };
}
