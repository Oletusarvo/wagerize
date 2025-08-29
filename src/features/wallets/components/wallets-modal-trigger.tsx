'use client';

import { Button } from '@/components/feature/button-temp';
import { Wallet } from 'lucide-react';
import { useWalletContext } from '../providers/wallet-provider';

export function WalletsModalTrigger() {
  const { toggleWalletsModal } = useWalletContext();
  return (
    <Button
      onClick={() => toggleWalletsModal(true)}
      variant='ghost'
      round>
      <Wallet
        color='white'
        size='18px'
      />
    </Button>
  );
}
