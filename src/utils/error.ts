export enum WError {
  QUOTA_FULL = 'quota_full',
}

export enum BetError {
  MAX_OUTCOMES = 'max_outcomes',
  MAX_BIDS = 'max_bids',
  EXPIRED = 'expired',
  NO_RAISE = 'no_raise',
  FOLDED = 'folded',
  FROZEN = 'frozen',
  BID_TOO_SMALL = 'bid_too_small',
  RAISE_TOO_SMALL = 'raise_too_small',
  RAISE_TOO_LARGE = 'raise_too_large',
  BID_ALREADY_PLACED = 'bid_already_placed',
  INVALID_CURRENCY = 'invalid_currency',
}
