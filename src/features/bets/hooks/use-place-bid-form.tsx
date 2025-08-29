import { useState } from 'react';
import { useOnSubmit } from '@/hooks/use-on-submit';
import { placeBidAction } from '@/features/bets/actions/place-bid-action';
import toast from 'react-hot-toast';
import { useBidContext } from '@/features/bids/providers/bid-provider';
import { usePlaceBidModalContext } from '@/features/bids/providers/place-bid-modal-provider';

export function usePlaceBidForm() {
  const { setShowPlaceBidModal } = usePlaceBidModalContext();
  const [selectedOutcome, setSelectedOutcome] = useState(null);
  const { bid } = useBidContext();

  const [onSubmit, status] = useOnSubmit({
    action: async payload => {
      if (!bid) {
        payload.set('outcome_id', selectedOutcome);
      } else {
        console.log(bid.id);
        payload.set('id', bid.id);
      }
      return await placeBidAction(payload);
    },
    onError: res => toast.error(res.error),
    onSuccess: () => setShowPlaceBidModal(false),
  });

  return { onSubmit, status, selectedOutcome, setSelectedOutcome };
}
