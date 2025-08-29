import { useRecord } from '@/hooks/use-record';
import { useStatus } from '@/hooks/use-status';
import { createBetAction } from '../actions/create-bet-action';
import toast from 'react-hot-toast';
import { useBatch } from '@/hooks/use-batch';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useFormData } from '@/hooks/use-form-data';
import { useOnSubmit } from '@/hooks/use-on-submit';
import { useParseWithZod } from '@/hooks/use-parse-with-zod';
import { betSchema } from '../schemas/bet-schema';
import { ZodSafeParseResult } from 'zod';
import { getParseResultErrorMessage } from '@/utils/get-parse-result-error-message';

export function useCreateBetForm() {
  const [payload, updatePayload] = useFormData({
    title: '',
    description: '',
    outcomes: [],
    min_bid: 1,
    min_raise: '',
    max_raise: '',
  });

  //Parse the whole schema, to keep tabs on the size of the min bid, as well as the min and max raises.
  const payloadParseResult = useParseWithZod(betSchema, payload);

  const [parseResult, setParseResult] = useState({
    title: '',
    description: null,
    min_bid: null,
    min_raise: null,
    max_raise: null,
  });

  const updateParseResult = (key: string, result: ZodSafeParseResult<string | number>) => {
    setParseResult(prev => ({
      ...prev,
      [key]: !result.success ? getParseResultErrorMessage(result) : null,
    }));
  };

  const router = useRouter();
  const { batch: options, add: addOption, del: deleteOpt } = useBatch();

  const [onSubmit, status] = useOnSubmit({
    payload,
    action: async payload => {
      payload.set('outcomes', JSON.stringify(options));
      console.log(payload);
      return await createBetAction(payload);
    },
    onError: err => toast.error(err.error),
    onSuccess: () => {
      router.push('/app/feed');
    },
  });

  return {
    payload,
    updatePayload,
    updateParseResult,
    status,
    onSubmit,
    options,
    addOption,
    deleteOpt,
    parseResult,
    payloadParseResult,
  };
}
