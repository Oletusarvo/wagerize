import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(8, {
    message: 'password_too_short',
  })
  .max(16, {
    message: 'password_too_long',
  })
  .nonempty();
