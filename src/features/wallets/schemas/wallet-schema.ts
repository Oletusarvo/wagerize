import z from 'zod';

export const walletSchema = z.object({
  currency_id: z.uuid(),
});

export type TWallet = z.infer<typeof walletSchema> & {
  id: string;
  balance: number;
};
