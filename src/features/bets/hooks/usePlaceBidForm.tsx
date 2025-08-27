import { useState } from 'react';
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { placeBidAction } from '@/features/bets/actions/placeBidAction';
import toast from 'react-hot-toast';
import { useBidContext } from '@/features/bids/providers/BidProvider';
import { usePlaceBidModalContext } from '@/features/bids/providers/PlaceBidModalProvider';

export function usePlaceBidForm() {
  const { setShowPlaceBidModal } = usePlaceBidModalContext();
  const [selectedOutcome, setSelectedOutcome] = useState(null);
  const { bid } = useBidContext();

  const [onSubmit, status] = useOnSubmit({
    action: async payload => {
      if (!bid) {
        payload.set('outcome_id', selectedOutcome);
      } else {
        payload.set('id', bid.id);
      }
      return await placeBidAction(payload);
    },
    onError: res => toast.error(res.error),
    onSuccess: () => setShowPlaceBidModal(false),
  });

  return { onSubmit, status, selectedOutcome, setSelectedOutcome };
}
