'use client';

import Link from 'next/link';
import { Header } from './ui/header';
import { RefObject, useRef } from 'react';
import { createContextWithHook } from '@/utils/create-context-with-hook';
import { IndexNavMenuTrigger } from '../features/main-menu/components/index-nav-menu-trigger';
import { MainMenuProvider } from '@/features/main-menu/providers/main-menu-provider';
import { Logo } from './logo';

const [AppHeaderContext, useAppHeaderContext] = createContextWithHook<{
  headerRef: RefObject<HTMLElement | null>;
}>('AppHeaderContext');

export { useAppHeaderContext };

export function AppHeader({ children }: React.PropsWithChildren) {
  const headerRef = useRef<HTMLElement>(null);

  return (
    <AppHeaderContext.Provider value={{ headerRef }}>
      <MainMenuProvider>
        <div className='flex flex-col w-full relative'>
          <Header ref={headerRef}>
            <div className='flex justify-between items-center w-full'>
              <div className='flex gap-2 items-center'>
                <Link
                  className='flex gap-2 items-center index-link'
                  href='/'>
                  <Logo />
                </Link>
              </div>
              <div className='flex gap-1 items-center'>
                {children}
                <IndexNavMenuTrigger />
              </div>
            </div>
          </Header>
        </div>
      </MainMenuProvider>
    </AppHeaderContext.Provider>
  );
}
