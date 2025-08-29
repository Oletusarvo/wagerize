import { z } from 'zod';
import { BetError } from '../error/bet-error';

export const outcomesSchema = z
  .array(z.string().nonempty())
  .nonempty()
  .max(10, BetError.MAX_OUTCOMES);
