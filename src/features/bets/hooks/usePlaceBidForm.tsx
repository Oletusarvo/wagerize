import toast from 'react-hot-toast';
import { placeBidAction } from '../actions/placeBidAction';
import { useStatus } from '@/hooks/useStatus';
import { useCallback, useState } from 'react';
import { useUserContext } from '@/features/users/contexts/UserProvider';
import { BetError } from '@/utils/error';

export function usePlaceBidForm(betId: string, minBid: number) {
  const [selectedOutcome, setSelectedOutcome] = useState(null);
  const [status, setStatus] = useStatus();
  const { user, updateSession } = useUserContext();

  const onSubmit = useCallback(
    async (e: any) => {
      e.preventDefault();
      let currentStatus: typeof status = 'loading';
      setStatus(currentStatus);
      try {
        const result = await placeBidAction({
          bet_id: betId,
          outcome_id: selectedOutcome,
          amount: e.target.amount.valueAsNumber,
        });

        if (result.code === 0) {
          toast.success('Bid placed successfully!');
          await updateSession();
          currentStatus = 'done';
        } else if (result.code === BetError.MAX_BIDS) {
          toast.error(
            'You have hit the limit of bids you can place! Please wait until some of the challenges you have bid on, are closed.'
          );
          currentStatus = 'error';
        } else if (result.code === BetError.EXPIRED) {
          toast.error('Cannot participate in an expired challenge!');
          currentStatus = 'error';
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
    },
    [setStatus, placeBidAction, updateSession, selectedOutcome]
  );

  return { onSubmit, status, selectedOutcome, setSelectedOutcome };
}
