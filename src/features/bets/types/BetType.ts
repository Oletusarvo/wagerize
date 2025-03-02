import { z } from 'zod';
import { betSchema } from '../schemas/betSchema';

export type BetType = z.infer<typeof betSchema>;
