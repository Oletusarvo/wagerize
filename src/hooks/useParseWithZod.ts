import { getParseResultErrorMessage } from '@/utils/getParseResultErrorMessage';
import { parseFormDataUsingSchema } from '@/utils/parseUsingSchema';
import { useEffect, useState } from 'react';
import { output, ZodError, ZodSafeParseResult, ZodType } from 'zod';

export function useParseWithZod<SchemaT extends ZodType>(
  schema: SchemaT,
  payload: FormData,
  onError: (err: string) => void
) {
  const [parseResult, setParseResult] = useState<ZodSafeParseResult<output<SchemaT>>>(null);

  useEffect(() => {
    setParseResult(parseFormDataUsingSchema(payload, schema));
  }, [payload]);

  useEffect(() => {
    if (parseResult?.success === false) {
      console.log('Parse error', parseResult.error);
      onError(getParseResultErrorMessage(parseResult));
    }
  }, [parseResult?.success]);

  return parseResult;
}
