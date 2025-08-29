'use client';

import { Modal } from '@/components/ui/modal-temp';
import { useWalletContext } from '../providers/wallet-provider';

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
