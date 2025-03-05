'use client';

import Link from 'next/link';
import { Header } from './ui/Header';
import { Casino, Clear, Menu } from '@mui/icons-material';
import { useUserContext } from '@/features/users/contexts/UserProvider';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';
import { IconButton } from '@mui/material';
import pkg from 'betting_app/package.json';

export function AppHeader() {
  const { user, status } = useUserContext();
  const pathname = usePathname();
  const currentPath = useMemo(() => pathname.split('/').at(-1), [pathname]);
  const [menuOpen, setMenuOpen] = useState(false);

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
          <Link href='/register'>Register</Link>
          <Link href='/login'>Login</Link>
        </>
      );
    }
  };

  const MenuIcon = menuOpen ? Clear : Menu;
  return (
    <Header>
      <div className='flex justify-between items-center w-full'>
        <div>
          <Link
            className='flex gap-2 items-center index-link'
            href='/'>
            <Casino sx={{ transform: 'rotate(45deg)' }} />
            <h1 className='text-xl font-semibold'>Wager Wave</h1>
          </Link>
          <small>{pkg.version}</small>
        </div>

        <nav className='gap-8 xs:hidden lg:flex'>{getLinks()}</nav>
        <div className='lg:hidden xs:block'>
          <IconButton onClick={() => setMenuOpen(prev => !prev)}>
            <MenuIcon sx={{ color: 'var(--color-accent)', zIndex: 30, margin: 0, padding: 0 }} />
          </IconButton>
          {menuOpen && (
            <nav
              onClick={() => setMenuOpen(false)}
              id='drop-down-menu'
              className='absolute top-18 left-0 w-full flex flex-col items-end gap-8 z-10 bg-white p-4 border-b border-border animate-slide-down duration-500'>
              {getLinks()}
            </nav>
          )}
        </div>
      </div>
    </Header>
  );
}
