import { z } from 'zod';

export const optionsSchema = z.array(z.string().nonempty()).nonempty();
