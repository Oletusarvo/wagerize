import { getParseResultErrorMessage } from '@/utils/get-parse-result-error-message';
import { ReactNode, useState } from 'react';
import { ZodType } from 'zod';
import { PassProps } from '../util/pass-props';

type WithZodParseResultProps = React.PropsWithChildren & {
  statusDisplay: (props: { status: string }) => ReactNode;
  schema: ZodType;
};

export function WithZodParseResult({
  children,
  statusDisplay: StatusDisplay,
  schema,
}: WithZodParseResultProps) {
  const [status, setStatus] = useState(null);
  return (
    <>
      <PassProps
        onChange={e => {
          const { type } = e.target;
          const value = type && type === 'number' ? e.target.valueAsNumber : e.target.value;
          if (type) {
            const result = schema.safeParse(value);
            if (!result.success) {
              setStatus(getParseResultErrorMessage(result));
            } else {
              setStatus(null);
            }
          }
        }}>
        {children}
      </PassProps>
      {status && <StatusDisplay status={status} />}
    </>
  );
}
