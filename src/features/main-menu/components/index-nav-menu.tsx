'use client';

import Link from 'next/link';
import { useAppHeaderContext } from '../../../components/app-header';
import { useUserContext } from '@/features/users/contexts/user-provider';
import { Spinner } from '../../../components/ui/spinner-temp';
import { useSession } from 'next-auth/react';
import { IconLink } from '@/components/ui/icon-link';
import { LogIn, LogOut, User2 } from 'lucide-react';
import { SmallIcon } from '@/components/ui/small-icon';

export function IndexNavMenu({ ref = null }) {
  const { headerRef } = useAppHeaderContext();
  const { status } = useSession();
  return (
    <nav
      ref={ref}
      id='drop-down-menu'
      className='absolute text-sm w-full flex flex-col gap-4 z-20 p-4 border-b border-border animate-slide-down bg-background-light shadow-md'
      style={{ top: headerRef.current?.offsetHeight || 0 }}>
      {status === 'authenticated' ? (
        <IconLink
          icon={<SmallIcon component={LogOut} />}
          href='/logout'>
          Logout
        </IconLink>
      ) : status === 'unauthenticated' ? (
        <>
          <IconLink
            href='/login'
            icon={<SmallIcon component={LogIn} />}>
            Login
          </IconLink>
          <IconLink
            icon={<SmallIcon component={User2} />}
            href='/register'
            className='xs:p-0 xs:rounded-none lg:py-2 lg:px-4 lg:rounded-[100px] lg:border-1 lg:border-accent transition-colors duration-300'>
            Sign Up
          </IconLink>
        </>
      ) : (
        <Spinner />
      )}
    </nav>
  );
}
