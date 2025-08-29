import { parseFormData } from '@/utils/parse-form-data';
import { useEffect, useState } from 'react';
import { ZodType } from 'zod';

export function useParseWithZod<SchemaT extends ZodType>(schema: SchemaT, payload: FormData) {
  const [parseResult, setParseResult] = useState<string>(null);

  useEffect(() => {
    setParseResult(() => {
      const obj = parseFormData(payload);
      const result = schema.safeParse(obj);
      return result.error?.issues.at(0).message || null;
    });
  }, [payload]);

  return parseResult;
}
