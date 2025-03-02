import { z } from 'zod';

export const loginCredentialsSchema = z
  .object({
    email: z.string().email().nonempty(),
    password: z.string().nonempty(),
  })
  .strict();
