import { ZodSafeParseResult, ZodType } from 'zod';
import { parseFormData } from './parse-form-data';
import { ZodParsedType } from 'zod/v3';

/**Safe-parses FormData using the passed Zod-schema, returning the result.*/
export const parseFormDataUsingSchema = <T extends ZodType>(payload: FormData, schema: T) => {
  const parsedPayload = parseFormData(payload);
  return schema.parse(parsedPayload);
};
