import { useRecord } from '@/hooks/useRecord';
import { useStatus } from '@/hooks/useStatus';
import { createBetAction } from '../actions/createBetAction';
import toast from 'react-hot-toast';
import { useBatch } from '@/hooks/useBatch';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { BetError, WError } from '@/utils/error';

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
        const result = await createBetAction(bet, options);
        if (result.code !== 0) {
          if (result.code === -1) {
            toast.error('An unexpected error occured!');
          } else if (result.code === WError.QUOTA_FULL) {
            toast.error(
              'You have created the maximum amount of challenges allowed for a user! Please close some of them and try again.'
            );
          } else if (result.code === BetError.MAX_OUTCOMES) {
            toast.error('Your bet has too many outcomes!');
          }
          currentStatus = 'error';
        } else {
          toast.success('Challenge created successfully!');
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
