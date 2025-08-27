import { AuthError } from '@/features/auth/error/AuthError';
import { RegisterError } from '@/features/register/types/RegisterError';
import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(8, AuthError.PASSWORD_TOO_SHORT)
  .max(16, AuthError.PASSWORD_TOO_LONG)
  .nonempty()
  .refine(value => {
    return /[a-zA-Z]/.test(value) && /[0-9]/.test(value) && /[!@#$%^&*(),.?":{}|<>]/.test(value);
  }, AuthError.PASSWORD_INVALID_FORMAT);
