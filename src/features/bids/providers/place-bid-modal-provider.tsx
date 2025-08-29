'use client';

import { ToggleProvider } from '@/providers/toggle-provider';
import { createContextWithHook } from '@/utils/create-context-with-hook';
import { SetStateAction, useState } from 'react';
import { PlaceBidForm } from '../components/place-bid-form';

const [PlaceBidModalContext, usePlaceBidModalContext] = createContextWithHook<{
  setShowPlaceBidModal: React.Dispatch<SetStateAction<boolean>>;
}>('PlaceBidModalContext');

export function PlaceBidModalProvider({ children }) {
  const [showPlaceBidModal, setShowPlaceBidModal] = useState(false);
  return (
    <PlaceBidModalContext.Provider value={{ setShowPlaceBidModal }}>
      <ToggleProvider
        initialState={showPlaceBidModal}
        onChange={state => setShowPlaceBidModal(state)}>
        {children}
        <ToggleProvider.Target>
          <PlaceBidForm />
        </ToggleProvider.Target>
      </ToggleProvider>
    </PlaceBidModalContext.Provider>
  );
}

export { usePlaceBidModalContext };
