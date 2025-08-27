'use client';

import { Button } from '@/components/feature/Button';
import { Wallet } from 'lucide-react';
import { useWalletContext } from '../providers/WalletProvider';

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
