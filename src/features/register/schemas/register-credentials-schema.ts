import { AuthError } from '@/features/auth/error/auth-error';
import { passwordSchema } from '@/schemas/password-schema';
import z from 'zod';

export const emailSchema = z.email().nonempty().trim();
export const registerEmailSchema = z.object({
  email: emailSchema,
});
export const ageSchema = z.string().refine(date => {
  const now = new Date();
  const dob = new Date(date);
  if (isNaN(dob.getTime())) {
    return false;
  }
  const age = now.getFullYear() - dob.getFullYear();
  return age >= 18;
}, AuthError.UNDERAGE);

export const registerCredentialsSchema = z
  .object({
    token: z.jwt(AuthError.TOKEN_INVALID),
    username: z.string().nonempty().trim(),
    dateOfBirth: ageSchema,
    password1: passwordSchema,
    password2: passwordSchema,
  })
  .strict()
  .refine(value => {
    //Make sure the passwords are the same.
    const { password1, password2 } = value;
    return password1 === password2;
  }, AuthError.PASSWORD_MISMATCH);
