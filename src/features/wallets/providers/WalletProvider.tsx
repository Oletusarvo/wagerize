'use client';

import { createContextWithHook } from '@/utils/createContextWithHook';
import { useState } from 'react';
import { TWallet } from '../schemas/walletSchema';
import { ToggleProvider } from '@/providers/ToggleProvider';
import { WalletsModal } from '../components/WalletsModal';

const [WalletContext, useWalletContext] = createContextWithHook<{
  wallet: TWallet;
  toggleWalletsModal: (state: boolean) => void;
}>('WalletContext');

type WalletProviderProps = React.PropsWithChildren & {
  initialWallet?: TWallet;
};

export function WalletProvider({ children, initialWallet }: WalletProviderProps) {
  const [wallet, setWallet] = useState(initialWallet);
  const [showWalletsModal, setShowWalletsModal] = useState(false);
  const toggleWalletsModal = state => setShowWalletsModal(state);

  return (
    <WalletContext.Provider value={{ wallet, toggleWalletsModal }}>
      <ToggleProvider
        initialState={showWalletsModal}
        onChange={state => setShowWalletsModal(state)}>
        {children}
        <ToggleProvider.Target>
          <WalletsModal />
        </ToggleProvider.Target>
      </ToggleProvider>
    </WalletContext.Provider>
  );
}

export { useWalletContext };
