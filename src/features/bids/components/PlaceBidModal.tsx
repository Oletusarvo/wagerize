'use client';

import { ConfirmModal } from '@/components/ConfirmModal';
import { usePlaceBidForm } from '@/features/bets/hooks/usePlaceBidForm';
import { useRef } from 'react';
import { PlaceBidForm } from './PlaceBidForm';
import { BidAmountInput } from './BidAmountInput';
import { OutcomeSelector } from './OutcomeSelector';
import { useBetContext } from '@/features/bets/providers/BetProvider';
import { useBidContext } from '../providers/BidProvider';

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
