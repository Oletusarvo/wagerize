'use client';

import { ToggleProvider } from '@/providers/toggle-provider';
import { useBetContext } from '../providers/bet-provider';
import { ConfirmModal } from '@/components/confirm-modal';
import { Button } from '@/components/feature/button';

export function EndBetButton() {
  const { end, setShowEndBetModal } = useBetContext();
  return (
    <Button
      fullWidth
      onClick={() => setShowEndBetModal(true)}>
      End Bet
    </Button>
  );
}
