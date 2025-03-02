import { useRecord } from '@/hooks/useRecord';
import { useStatus } from '@/hooks/useStatus';
import { useEffect } from 'react';
import { createBetAction } from '../actions/createBetAction';
import toast from 'react-hot-toast';

export function useCreateBetForm() {
  const { record: bet, updateOnChange: updateBet } = useRecord({
    title: '',
    author_id: '',
    created_at: null,
    expires_at: null,
    data: {
      min_bid: 1,
    },
  });

  const [status, setStatus] = useStatus();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let currentStatus: typeof status = 'loading';
    setStatus(currentStatus);
    try {
      const result = await createBetAction(bet);
      if (result.code !== 0) {
        currentStatus = 'error';
      } else {
        toast.success('Bet created successfully!');
        currentStatus = 'done';
      }
    } catch (err) {
      toast.error('An unknown error occured!');
      currentStatus = 'error';
    } finally {
      setStatus(currentStatus);
    }
  };
  return { bet, updateBet, status, onSubmit };
}
