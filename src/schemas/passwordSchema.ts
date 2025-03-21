import { RegisterError } from '@/features/users/register/types/RegisterError';
import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(8, {
    message: 'password_too_short',
  })
  .max(16, {
    message: 'password_too_long',
  })
  .nonempty()
  .refine(value => {
    return /[a-zA-Z]/.test(value) && /[0-9]/.test(value) && /[!@#$%^&*(),.?":{}|<>]/.test(value);
  }, RegisterError.INVALID_PASSWORD_FORMAT);
