'use client';

import { ConfirmModal } from '@/components/confirm-modal';
import { Button } from '@/components/feature/button-temp';
import { ToggleProvider } from '@/providers/toggle-provider';
import { useBetContext } from '../providers/bet-provider';

export function FreezeBetButton() {
  const { freeze } = useBetContext();

  return (
    <ToggleProvider>
      <ToggleProvider.Trigger>
        <Button fullWidth>Freeze</Button>
      </ToggleProvider.Trigger>
      <ToggleProvider.Target>
        <ConfirmModal
          title='Freeze Bet'
          onConfirm={async () => await freeze()}>
          You are about to freeze the bet. Frozen bets cannot be bid on until the bet is
          re-activated. Are you sure you wish to continue?
        </ConfirmModal>
      </ToggleProvider.Target>
    </ToggleProvider>
  );
}
