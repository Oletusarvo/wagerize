'use client';

import { ToggleProvider } from '@/providers/ToggleProvider';
import { useBetContext } from '../providers/BetProvider';
import { ConfirmModal } from '@/components/ConfirmModal';
import { Button } from '@/components/feature/Button';

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
