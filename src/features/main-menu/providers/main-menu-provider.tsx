'use client';

import { ToggleProvider } from '@/providers/toggle-provider';
import { createContextWithHook } from '@/utils/create-context-with-hook';
import { useState } from 'react';
import { IndexNavMenu } from '../components/index-nav-menu';

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
