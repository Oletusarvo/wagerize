'use client';

import { Modal } from '@/components/ui/Modal';
import { useWalletContext } from '../providers/WalletProvider';

export function WalletsModal(props) {
  const { wallet, toggleWalletsModal } = useWalletContext();
  return (
    <Modal
      fullHeight
      title='Transactions'
      {...props}
      onClose={() => toggleWalletsModal(false)}></Modal>
  );
}
