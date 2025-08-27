import { createFeatureErrorBuilder } from '@/utils/createFeatureErrorBuilder';

const error = createFeatureErrorBuilder('bet');

export const BetError = {
  MAX_OUTCOMES: error('max_outcomes'),
  MAX_BIDS: error('max_bids'),
  EXPIRED: error('expired'),
  NO_RAISE: error('no_raise'),
  FOLDED: error('folded'),
  FROZEN: error('frozen'),
  BID_TOO_SMALL: error('bid_too_small'),
  RAISE_TOO_SMALL: error('raise_too_small'),
  RAISE_TOO_LARGE: error('raise_too_large'),
  BID_ALREADY_PLACED: error('bid_already_placed'),
  INVALID_CURRENCY: error('invalid_currency'),
  QUOTA_REACHED: error('quota_reached'),
  MIN_RAISE_EXCESS: error('min_raise_excess'),
  TITLE_TOO_LONG: error('title_too_long'),
  TITLE_TOO_SHORT: error('title_too_short'),
  DESCRIPTION_TOO_LONG: error('description_too_long'),
  MIN_RAISE_SIZE: error('min_raise_size'),
};

export type TBetError = (typeof BetError)[keyof typeof BetError];
