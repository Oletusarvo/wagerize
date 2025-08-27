'use client';

import { ToggleProvider } from '@/providers/ToggleProvider';
import { createContextWithHook } from '@/utils/createContextWithHook';
import { useState } from 'react';
import { IndexNavMenu } from '../components/IndexNavMenu';

const [MainMenuContext, useMainMenuContext] = createContextWithHook<{
  mainMenuOpen: boolean;
  toggleMainMenu: (state: boolean) => void;
}>('MainMenuContext');

export function MainMenuProvider({ children }: React.PropsWithChildren) {
  const [mainMenuOpen, setMainMenuOpen] = useState(false);
  const toggleMainMenu = (state: boolean) => setMainMenuOpen(state);
  return (
    <MainMenuContext.Provider value={{ mainMenuOpen, toggleMainMenu }}>
      <ToggleProvider
        initialState={mainMenuOpen}
        onChange={state => toggleMainMenu(state)}>
        {children}
        <ToggleProvider.Target hideOnClickOutside>
          <IndexNavMenu />
        </ToggleProvider.Target>
      </ToggleProvider>
    </MainMenuContext.Provider>
  );
}

export { useMainMenuContext };
