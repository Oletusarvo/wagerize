'use client';

import { ConfirmModal } from '@/components/ConfirmModal';
import { Button } from '@/components/feature/Button';
import { ToggleProvider } from '@/providers/ToggleProvider';
import { useBetContext } from '../providers/BetProvider';

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
