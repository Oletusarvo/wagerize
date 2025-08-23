import { passwordSchema } from '@/schemas/passwordSchema';
import z from 'zod';

export const registerCredentialsSchema = z
  .object({
    email: z.string().email().nonempty().trim(),
    dateOfBirth: z.string().date(),
    password1: passwordSchema,
    password2: passwordSchema,
  })
  .strict()
  .refine(
    value => {
      //Make sure the passwords are the same.
      const { password1, password2, dateOfBirth } = value;
      const passwordsEqual = password1 === password2;
      const age = new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
      return passwordsEqual && age >= 18;
    },
    {
      message: 'password_mismatch',
    }
  );
