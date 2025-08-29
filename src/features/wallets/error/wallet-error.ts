import { createFeatureErrorBuilder } from '@/utils/create-feature-error-builder';

const error = createFeatureErrorBuilder('wallet');

export const WalletError = {
  INSUFFICIENT_FUNDS: error('insufficient_funds'),
  NOT_FOUND: error('not_found'),
};

export type TWalletError = (typeof WalletError)[keyof typeof WalletError];
