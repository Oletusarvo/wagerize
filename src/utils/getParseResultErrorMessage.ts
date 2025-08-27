import { ZodError, ZodSafeParseResult, ZodType } from 'zod';

export const getParseResultErrorMessage = <E>(parseResult: ZodSafeParseResult<any>) =>
  parseResult.error.issues.at(0)?.message as E;
