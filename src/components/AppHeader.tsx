'use client';

import Link from 'next/link';
import { Header } from './ui/Header';
import { Casino, Clear, Menu } from '@mui/icons-material';
import { useUserContext } from '@/features/users/contexts/UserProvider';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { IconButton } from '@mui/material';
import pkg from 'betting_app/package.json';
import { Logo } from './Logo';
import { ToggleProvider } from './feature/ToggleProvider';

export function AppHeader() {
  const { user, status } = useUserContext();
  const pathname = usePathname();
  const currentPath = useMemo(() => pathname.split('/').at(-1), [pathname]);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const getLinks = () => {
    if (status === 'authenticated' && user) {
      return (
        <>
          <Link href='/logout'>Logout</Link>
        </>
      );
    } else {
      return (
        <>
          <Link href='/login'>Login</Link>
          <Link
            href='/register'
            className='xs:p-0 xs:rounded-none lg:py-2 lg:px-4 lg:rounded-[100px] lg:border-1 border-accent text-accent'>
            Sign Up
          </Link>
        </>
      );
    }
  };

  const MenuIcon = menuOpen ? Clear : Menu;

  return (
    <ToggleProvider onChange={state => setMenuOpen(state)}>
      <div className='flex flex-col w-full relative'>
        <Header ref={headerRef}>
          <div className='flex justify-between items-center w-full'>
            <div className='flex flex-col'>
              <Link
                className='flex gap-2 items-center index-link'
                href='/'>
                <Logo />
              </Link>
              <small className='ml-8'>{pkg.version}</small>
            </div>

            <nav className='gap-8 xs:hidden lg:flex lg:items-center xs:items-none lg:text-sm'>
              {getLinks()}
            </nav>
            <div className='lg:hidden xs:block'>
              <ToggleProvider.Trigger>
                <IconButton>
                  <MenuIcon
                    sx={{ color: 'var(--color-accent)', zIndex: 30, margin: 0, padding: 0 }}
                  />
                </IconButton>
              </ToggleProvider.Trigger>
            </div>
          </div>
        </Header>

        <ToggleProvider.Target hideOnClickOutside>
          <nav
            id='drop-down-menu'
            className='absolute w-full flex flex-col items-end gap-8 z-20 bg-white p-4 border-b border-border animate-slide-down'
            style={{ top: headerRef.current?.offsetHeight || 0 }}>
            {getLinks()}
          </nav>
        </ToggleProvider.Target>
      </div>
    </ToggleProvider>
  );
}
