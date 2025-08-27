import { useRecord } from '@/hooks/useRecord';
import { useStatus } from '@/hooks/useStatus';
import { createBetAction } from '../actions/createBetAction';
import toast from 'react-hot-toast';
import { useBatch } from '@/hooks/useBatch';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { useFormData } from '@/hooks/useFormData';
import { useOnSubmit } from '@/hooks/useOnSubmit';

export function useCreateBetForm() {
  const [payload, updatePayload] = useFormData({
    title: '',
    description: '',
    outcomes: [],
    min_bid: '',
    min_raise: '',
    max_raise: '',
  });

  const router = useRouter();
  const { batch: options, add: addOption, del: deleteOpt } = useBatch();

  const [onSubmit, status] = useOnSubmit({
    payload,
    action: async payload => {
      payload.set('outcomes', JSON.stringify(options));
      return await createBetAction(payload);
    },
    onSuccess: () => {
      router.push('/app/feed');
    },
  });

  return { payload, updatePayload, status, onSubmit, options, addOption, deleteOpt };
}
