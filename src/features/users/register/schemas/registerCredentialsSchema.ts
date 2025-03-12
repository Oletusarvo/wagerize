import { passwordSchema } from '@/schemas/passwordSchema';
import z from 'zod';

export const registerCredentialsSchema = z
  .object({
    email: z.string().email().nonempty().trim(),
    dateOfBirth: z.string(),
    password1: passwordSchema,
    password2: passwordSchema,
  })
  .strict()
  .refine(
    value => {
      const { dateOfBirth } = value;
      const age = new Date().getFullYear() - new Date(dateOfBirth).getFullYear(); // Updated to use date object
      return age >= 18;
    },
    {
      message: 'underage',
    }
  )
  .refine(
    value => {
      //Make sure the passwords are the same.
      const { password1, password2 } = value;
      const passwordsEqual = password1 === password2;
      return passwordsEqual;
    },
    {
      message: 'password_mismatch',
    }
  );
