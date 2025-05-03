import { z } from 'zod';

const betDataSchemaVersion = 2;

const betDataSchema = z
  .object({
    title: z.string().max(64).nonempty(),
    description: z.string().max(255).optional(),
    min_bid: z.number().int().positive(),
    min_raise: z.number().optional(),
    is_frozen: z.boolean().optional(),
    _schemaVersion: z.number().int().optional(),
  })
  .strict()
  .transform(value => {
    value._schemaVersion = betDataSchemaVersion;
    return value;
  });

export const betSchema = z.object({
  id: z.string().uuid().optional(),
  author_id: z.string().uuid(),
  currency_id: z.string().uuid(),
  created_at: z.string().optional().nullable(),
  expires_at: z.string().optional().nullable(),
  data: betDataSchema,
});
