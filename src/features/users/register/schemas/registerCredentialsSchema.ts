import { passwordSchema } from '@/schemas/passwordSchema';
import z from 'zod';

export const registerCredentialsSchema = z
  .object({
    email: z.string().email().nonempty().trim(),
    password1: passwordSchema,
    password2: passwordSchema,
  })
  .strict()
  .refine(
    value => {
      //Make sure the passwords are the same.
      const { password1, password2 } = value;
      return password1 === password2;
    },
    {
      message: 'password_mismatch',
    }
  );
