'use client';
import { Button } from '@/components/feature/button-temp';
import { ToggleProvider } from '@/providers/toggle-provider';
import { useBetContext } from '../../bets/providers/bet-provider';
import { useBidContext } from '@/features/bids/providers/bid-provider';

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
