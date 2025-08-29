import { createFeatureErrorBuilder } from '@/utils/create-feature-error-builder';

const error = createFeatureErrorBuilder('auth');

export const AuthError = {
  UNAUTHORIZED: error('unauthorized'),
  USER_QUOTA_FULL: error('user_quota_full'),
  PASSWORD_MISMATCH: error('password_mismatch'),
  PASSWORD_TOO_SHORT: error('password_too_short'),
  PASSWORD_TOO_LONG: error('password_too_long'),
  PASSWORD_INVALID_FORMAT: error('password_invalid_format'),
  DUPLICATE_USER: error('duplicate_user'),
  UNDERAGE: error('underage'),
  EMAIL_INVALID: error('email_invalid'),
  TOKEN_INVALID: error('token_invalid'),
  NOT_FOUND: error('not_found'),
};

export type TAuthError = (typeof AuthError)[keyof typeof AuthError];
