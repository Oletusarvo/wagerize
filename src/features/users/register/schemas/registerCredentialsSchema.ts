import z from 'zod';

export const registerCredentialsSchema = z
  .object({
    email: z.string().email().nonempty().trim(),
    password1: z.string().min(8).max(16).nonempty(),
    password2: z.string().min(8).max(16).nonempty(),
  })
  .strict()
  .refine(value => {
    const { password1, password2 } = value;
    return password1 === password2;
  });
