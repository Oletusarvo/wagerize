import { useRecord } from '@/hooks/useRecord';
import { useStatus } from '@/hooks/useStatus';
import { createBetAction } from '../actions/createBetAction';
import toast from 'react-hot-toast';
import { useBatch } from '@/hooks/useBatch';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';

export function useCreateBetForm() {
  const { record: bet, updateOnChange: updateBet } = useRecord({
    author_id: '',
    created_at: null,
    expires_at: undefined,
    data: {
      title: '',
      description: '',
      min_bid: 1,
    },
  });

  const router = useRouter();
  const { batch: options, add: addOption, del: deleteOpt } = useBatch();
  const [status, setStatus] = useStatus();

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      let currentStatus: typeof status = 'loading';
      setStatus(currentStatus);
      try {
        toast.success('Creating bet...');
        const result = await createBetAction(bet, options);
        if (result.code !== 0) {
          if (result.code === 'unknown') {
            toast.error('An unexpected error occured!');
          }
          currentStatus = 'error';
        } else {
          toast.success('Bet created successfully!');
          currentStatus = 'done';
          router.replace('/auth/bets');
        }
      } catch (err) {
        toast.error('An unknown error occured!');
        currentStatus = 'error';
      } finally {
        setStatus(currentStatus);
      }
    },
    [setStatus, router, bet, options]
  );

  return { bet, updateBet, status, onSubmit, options, addOption, deleteOpt };
}
