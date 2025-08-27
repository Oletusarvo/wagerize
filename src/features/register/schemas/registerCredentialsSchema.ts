import { AuthError } from '@/features/auth/error/AuthError';
import { passwordSchema } from '@/schemas/passwordSchema';
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
    const { password1, password2, dateOfBirth } = value;
    const passwordsEqual = password1 === password2;
    const age = new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
    return passwordsEqual && age >= 18;
  }, AuthError.PASSWORD_MISMATCH);
