import z from 'zod';

export const placeBidSchema = z.object({
  bet_id: z.uuid(),
  outcome_id: z.uuid(),
  amount: z.number(),
});

export const updateBidSchema = z.object({
  id: z.uuid(),
  amount: z.number(),
  bet_id: z.uuid(),
});

export const bidSchema = placeBidSchema.or(updateBidSchema);

export type TBid = z.infer<typeof bidSchema> & {
  id: string;
  user_id: string;
  placed_at: string;
  updated_at: string;
};
