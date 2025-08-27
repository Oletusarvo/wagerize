'use client';
import { Button } from '@/components/feature/Button';
import { ToggleProvider } from '@/providers/ToggleProvider';
import { Container } from '@/components/ui/Container';
import { FormHeading } from '@/components/ui/FormHeading';
import { Modal } from '@/components/ui/Modal';
import { useState } from 'react';
import { useBetContext } from '../../bets/providers/BetProvider';
import { useBidContext } from '@/features/bids/providers/BidProvider';
import { PlaceBidForm } from './PlaceBidForm';
import { ArrowDown, ArrowUpCircle, Dice5 } from 'lucide-react';
import { PlaceBidModal } from './PlaceBidModal';

export function PlaceBidButton() {
  const { bet } = useBetContext();
  const { bid, mustCall } = useBidContext();

  return (
    <ToggleProvider.Trigger>
      <Button
        disabled={bet.status === 'frozen' || (bid !== undefined && !mustCall)}
        type='button'
        color='accent'
        fullWidth>
        {mustCall ? 'Call' : 'Place Bid'}
      </Button>
    </ToggleProvider.Trigger>
  );
}
