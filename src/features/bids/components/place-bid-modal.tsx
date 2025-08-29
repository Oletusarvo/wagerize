'use client';

import { ConfirmModal } from '@/components/confirm-modal';
import { usePlaceBidForm } from '@/features/bets/hooks/use-place-bid-form';
import { useRef } from 'react';
import { PlaceBidForm } from './place-bid-form';
import { BidAmountInput } from './bid-amount-input';
import { OutcomeSelector } from './outcome-selector';
import { useBetContext } from '@/features/bets/providers/bet-provider';
import { useBidContext } from '../providers/bid-provider';

export function PlaceBidModal() {
  const { bet } = useBetContext();
  const { bid } = useBidContext();
  const { onSubmit, setSelectedOutcome, selectedOutcome, status } = usePlaceBidForm();
  const modalRef = useRef<HTMLFormElement>(null);

  return (
    <ConfirmModal
      title='Place Bid'
      as='form'
      onConfirm={async e => await onSubmit(e)}>
      {!bid && (
        <OutcomeSelector
          values={bet.outcomes}
          selectedValue={selectedOutcome}
          onChange={value => setSelectedOutcome(value)}
        />
      )}
      <BidAmountInput />
    </ConfirmModal>
  );
}
