import { ZodType } from 'zod';
import { parseFormData } from './parseFormData';

/**Safe-parses FormData using the passed Zod-schema, returning the result.*/
export const parseFormDataUsingSchema = <T extends ZodType>(payload: FormData, schema: T) => {
  const parsedPayload = parseFormData(payload);
  return schema.safeParse(parsedPayload);
};
