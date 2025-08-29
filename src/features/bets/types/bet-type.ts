import { z } from 'zod';
import { betSchema } from '../schemas/bet-schema';

/**@deprecated */
export type BetType = z.infer<typeof betSchema>;
