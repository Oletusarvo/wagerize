import { createFeatureErrorBuilder } from '@/utils/createFeatureErrorBuilder';

const error = createFeatureErrorBuilder('bid');

export const BidError = {
  BID_TOO_SMALL: error('bid_too_small'),
  RAISE_TOO_SMALL: error('raise_too_small'),
  RAISE_TOO_LARGE: error('raise_too_large'),
  QUOTA_FULL: error('quota_full'),
};

export type TBidError = (typeof BidError)[keyof typeof BidError];
