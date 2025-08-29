'use client';

import Link from 'next/link';
import { useAppHeaderContext } from '../../../components/app-header';
import { useUserContext } from '@/features/users/contexts/user-provider';
import { Spinner } from '../../../components/ui/spinner-temp';
import { useSession } from 'next-auth/react';

export function IndexNavMenu({ ref = null }) {
  const { headerRef } = useAppHeaderContext();
  const { status } = useSession();
  return (
    <nav
      ref={ref}
      id='drop-down-menu'
      className='absolute w-full flex flex-col items-end gap-8 z-20 p-4 border-b border-border animate-slide-down bg-background-light shadow-md'
      style={{ top: headerRef.current?.offsetHeight || 0 }}>
      {status === 'authenticated' ? (
        <Link href='/logout'>Logout</Link>
      ) : status === 'unauthenticated' ? (
        <>
          <Link href='/login'>Login</Link>
          <Link
            href='/register'
            className='xs:p-0 xs:rounded-none lg:py-2 lg:px-4 lg:rounded-[100px] lg:border-1 lg:border-accent transition-colors duration-300'>
            Sign Up
          </Link>
        </>
      ) : (
        <Spinner />
      )}
    </nav>
  );
}
