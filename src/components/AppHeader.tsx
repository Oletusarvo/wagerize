'use client';

import Link from 'next/link';
import { Header } from './ui/Header';
import { usePathname } from 'next/navigation';
import { useMemo, useRef, useState } from 'react';
import pkg from 'betting_app/package.json';
import { Logo } from './Logo';
import { ToggleProvider } from './feature/ToggleProvider';
import { Menu, X } from 'lucide-react';

export function AppHeader() {
  const pathname = usePathname();
  const currentPath = useMemo(() => pathname.split('/').at(-1), [pathname]);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const MenuIcon = menuOpen ? X : Menu;

  return (
    <ToggleProvider onChange={state => setMenuOpen(state)}>
      <div className='flex flex-col w-full relative'>
        <Header ref={headerRef}>
          <div className='flex justify-between items-center w-full'>
            <div className='flex gap-2 items-center'>
              <Link
                className='flex gap-2 items-center index-link'
                href='/'>
                <Logo />
              </Link>
              <small className='text-secondary'>{pkg.version}</small>
            </div>

            <nav className='gap-8 xs:hidden lg:flex lg:items-center xs:items-none lg:text-sm'>
              <Link href='/login'>Login</Link>
              <Link
                href='/register'
                className='xs:p-0 xs:rounded-none lg:py-2 lg:px-4 lg:rounded-[100px] lg:border-1 lg:border-accent md:hover:bg-accent-background transition-colors duration-300'>
                Sign Up
              </Link>
            </nav>
            <div className='lg:hidden xs:block'>
              <ToggleProvider.Trigger>
                <button className='button --round --ghost'>
                  <Menu color='var(--color-accent)' />
                </button>
              </ToggleProvider.Trigger>
            </div>
          </div>
        </Header>

        <ToggleProvider.Target hideOnClickOutside>
          <nav
            id='drop-down-menu'
            className='absolute w-full flex flex-col items-end gap-8 z-20 p-4 border-b border-border animate-slide-down bg-background-light'
            style={{ top: headerRef.current?.offsetHeight || 0 }}>
            <Link href='/login'>Login</Link>
            <Link
              href='/register'
              className='xs:p-0 xs:rounded-none lg:py-2 lg:px-4 lg:rounded-[100px] lg:border-1 lg:border-accent transition-colors duration-300'>
              Sign Up
            </Link>
          </nav>
        </ToggleProvider.Target>
      </div>
    </ToggleProvider>
  );
}
