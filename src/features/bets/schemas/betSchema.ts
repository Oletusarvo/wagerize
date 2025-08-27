import { z } from 'zod';
import { outcomesSchema } from './outcomesSchema';
import { BetError } from '../error/BetError';

const betCoreSchema = z.object({
  currency_id: z.uuid().optional(),
  created_at: z.string().optional().nullable(),
  expires_at: z.string().optional().nullable(),
});

export const betTitleSchema = z
  .string()
  .min(3, BetError.TITLE_TOO_SHORT)
  .max(32, BetError.TITLE_TOO_LONG)
  .trim();

export const betDescriptionSchema = z
  .string()
  .max(255, BetError.DESCRIPTION_TOO_LONG)
  .trim()
  .optional();

const betMetadataSchema = z
  .object({
    title: betTitleSchema,
    description: betDescriptionSchema,
    min_bid: z.int().default(1),
    min_raise: z.int().min(1, BetError.MIN_RAISE_SIZE).optional(),
    max_raise: z.int().optional(),
  })
  .refine(val => {
    return val.min_raise < val.max_raise;
  }, BetError.MIN_RAISE_EXCESS);

export const betSchema = betCoreSchema.extend(betMetadataSchema.shape).extend({
  outcomes: outcomesSchema,
});

const t = betSchema.omit({ outcomes: true });

export type TBet = z.infer<typeof t> & {
  id: string;
  bet_status_id: number;
  status: string;
  pool: number;
  outcomes: { label: string; id: string }[];
};
