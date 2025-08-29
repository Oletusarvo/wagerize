'use client';

import { ConfirmModal } from '@/components/confirm-modal';
import { Button } from '@/components/feature/button';
import { ToggleProvider } from '@/providers/toggle-provider';
import { useBetContext } from '../providers/bet-provider';

export function ActivateBetButton() {
  const { activate } = useBetContext();

  return (
    <ToggleProvider>
      <ToggleProvider.Trigger>
        <Button fullWidth>Re-activate</Button>
      </ToggleProvider.Trigger>
      <ToggleProvider.Target>
        <ConfirmModal
          title='Re-activate Bet'
          onConfirm={async () => await activate()}>
          You are about to re-activate the bet. Are you sure you wish to continue?
        </ConfirmModal>
      </ToggleProvider.Target>
    </ToggleProvider>
  );
}
