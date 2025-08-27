'use client';

import Link from 'next/link';
import { Header } from './ui/Header';
import { usePathname } from 'next/navigation';
import { RefObject, useMemo, useRef, useState } from 'react';
import pkg from 'betting_app/package.json';
import { Logo } from './Logo';
import { ToggleProvider } from '../providers/ToggleProvider';
import { Bell, Menu, Wallet, X } from 'lucide-react';
import { createContextWithHook } from '@/utils/createContextWithHook';
import { IndexNavMenuTrigger } from '../features/mainMenu/components/IndexNavMenuTrigger';
import { IndexNavMenu } from '../features/mainMenu/components/IndexNavMenu';
import { Button } from './feature/Button';
import { MainMenuProvider } from '@/features/mainMenu/providers/MainMenuProvider';
import { NotificationsTrigger } from '@/features/notifications/components/NotificationsTrigger';
import { WalletsModalTrigger } from '@/features/wallets/components/WalletsModalTrigger';

const [AppHeaderContext, useAppHeaderContext] = createContextWithHook<{
  headerRef: RefObject<HTMLElement | null>;
}>('AppHeaderContext');

export { useAppHeaderContext };

export function AppHeader() {
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
                <WalletsModalTrigger />
                <NotificationsTrigger />
                <IndexNavMenuTrigger />
              </div>
            </div>
          </Header>
        </div>
      </MainMenuProvider>
    </AppHeaderContext.Provider>
  );
}
