'use client';

import { createContextWithHook } from '@/utils/create-context-with-hook';
import { useState } from 'react';
import { TWallet } from '../schemas/wallet-schema';
import { ToggleProvider } from '@/providers/toggle-provider';
import { WalletsModal } from '../components/wallets-modal';
import { useSocketRooms } from '@/hooks/use-socket-rooms';
import { useSocketHandlers } from '@/hooks/use-socket-handlers';

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

  useSocketRooms([`wallet:${wallet.id}`]);
  useSocketHandlers({
    'wallet:update': payload => {
      console.log('Wallet update: ', payload);
      if (payload.id !== wallet.id) return;
      setWallet(prev => ({ ...prev, balance: payload.balance }));
    },
  });

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
