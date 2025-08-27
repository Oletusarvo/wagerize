import { createFeatureErrorBuilder } from '@/utils/createFeatureErrorBuilder';

const error = createFeatureErrorBuilder('wallet');

export const WalletError = {
  INSUFFICIENT_FUNDS: error('insufficient_funds'),
  NOT_FOUND: error('not_found'),
};

export type TWalletError = (typeof WalletError)[keyof typeof WalletError];
