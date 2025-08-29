import { registerCredentialsSchema } from '@/features/register/schemas/register-credentials-schema';
import { passwordSchema } from '@/schemas/password-schema';
import z from 'zod';

export const passwordResetSchema = registerCredentialsSchema
  .safeExtend({
    token: z.jwt(),
    password1: passwordSchema,
    password2: passwordSchema,
  })
  .omit({
    username: true,
    dateOfBirth: true,
  })
  .refine(data => data.password1 === data.password2);

export const emailSchema = z.object({
  email: z.email(),
});
