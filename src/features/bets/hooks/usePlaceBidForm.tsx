import toast from 'react-hot-toast';
import { placeBidAction } from '../actions/placeBidAction';
import { useStatus } from '@/hooks/useStatus';
import { useState } from 'react';
import { useUserContext } from '@/features/users/contexts/UserProvider';

export function usePlaceBidForm(betId: string, minBid: number) {
  const [selectedOutcome, setSelectedOutcome] = useState(null);
  const [status, setStatus] = useStatus();
  const { user, updateSession } = useUserContext();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let currentStatus: typeof status = 'loading';
    setStatus(currentStatus);
    try {
      const result = await placeBidAction({
        bet_id: betId,
        outcome_id: selectedOutcome,
        amount: minBid,
      });

      if (result === 0) {
        toast.success('Bid placed successfully!');
        await updateSession();
        currentStatus = 'done';
      } else {
        toast.error('An unknown error occured!');
        currentStatus = 'error';
      }
    } catch (err) {
      toast.error('An unexpected error occured!');
      currentStatus = 'error';
    } finally {
      setStatus(currentStatus);
    }
  };

  return { onSubmit, status, selectedOutcome, setSelectedOutcome };
}
