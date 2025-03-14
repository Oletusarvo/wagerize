'use client';

import { useUserContext } from '@/features/users/contexts/UserProvider';
import {
  Add,
  ArrowBack,
  Casino,
  Clear,
  Cookie,
  Dashboard,
  Login,
  Person,
} from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Icon } from './ui/Icon';
import { Spinner } from './ui/Spinner';
import { ToggleProvider } from './feature/ToggleProvider';
import { useRef, useState } from 'react';
import { set } from 'zod';
import { FormHeading } from './ui/FormHeading';
import { Button } from './feature/Button';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export function AppFooter() {
  const { status: sessionStatus } = useUserContext();
  const pathname = usePathname();
  const currentPath = usePathname().split('/').at(-1);

  const router = useRouter();
  const footerRef = useRef<HTMLElement | null>(null);
  const [cookieNoticeOpen, setCookieNoticeOpen] = useState(false);

  const getNavContent = () => {
    if (sessionStatus === 'authenticated') {
      if (
        pathname === '/auth/bets/create' ||
        pathname === '/dashboard/settings' ||
        //Will match the path when viewing a single bet.
        pathname.includes('/auth/bets/')
      ) {
        return (
          <IconButton onClick={() => router.back()}>
            <Icon
              Component={ArrowBack}
              size='large'
            />
          </IconButton>
        );
      } else {
        return (
          <>
            <Link href='/auth/dashboard'>
              <IconButton>
                <Icon
                  Component={Person}
                  size='large'
                />
              </IconButton>
            </Link>
            <Link href='/auth/bets/create'>
              <IconButton>
                <Icon
                  Component={Add}
                  size='large'
                />
              </IconButton>
            </Link>
            <Link href='/auth/bets'>
              <IconButton>
                <Icon
                  Component={Casino}
                  size='large'
                />
              </IconButton>
            </Link>
          </>
        );
      }
    } else if (sessionStatus === 'unauthenticated') {
      if (pathname === '/login' || pathname === '/register' || pathname === '/login/reset') {
        return (
          <IconButton onClick={() => router.back()}>
            <Icon
              Component={ArrowBack}
              size='large'
            />
          </IconButton>
        );
      } else {
        return (
          <ToggleProvider onChange={state => setCookieNoticeOpen(state)}>
            <ToggleProvider.Trigger>
              {/**Must be wrapped within a button, because the IconButton ignores class names. The Trigger passes a mandatory class name to its children. */}
              <button>
                <IconButton sx={{ color: 'var(--color-accent)' }}>
                  {!cookieNoticeOpen ? <Cookie /> : <Clear />}
                </IconButton>
              </button>
            </ToggleProvider.Trigger>
            <ToggleProvider.Target hideOnClickOutside>
              <div
                className='border-t border-border absolute xs:left-0 lg:left-[40%] lg:translate-x-[-30%] bg-white z-10 xs:w-full lg:w-[50%] animate-slide-up flex flex-col gap-4 py-8 px-4'
                style={{ bottom: footerRef.current?.offsetHeight || 0 }}>
                <div className='flex items-center justify-between border-b border-border pb-4'>
                  <FormHeading>Cookies</FormHeading>
                  <ToggleProvider.Trigger>
                    {/**Ditto */}
                    <button>
                      <IconButton sx={{ color: 'var(--color-accent)' }}>
                        <Clear />
                      </IconButton>
                    </button>
                  </ToggleProvider.Trigger>
                </div>

                <p>
                  We use cookies to enhance your experience on our website. The cookies we use are
                  necessary for the functionality of the site and are used to store information
                  about your session. These cookies are essential for ensuring that you can navigate
                  the site and use its features.
                  <br /> By continuing to browse our site, you agree to our use of these mandatory
                  cookies.
                </p>
                <ToggleProvider.Trigger>
                  <Button
                    fullWidth
                    color='accent'
                    type='button'
                    onClick={() => setCookieNoticeOpen(false)}>
                    Got it
                  </Button>
                </ToggleProvider.Trigger>
              </div>
            </ToggleProvider.Target>
          </ToggleProvider>
        );
      }
    } else {
      return <Spinner />;
    }
  };

  return (
    <footer
      ref={footerRef}
      className='relative lg:px-default xs:px-4 py-4 z-30 app-footer flex gap-8 items-center justify-center bg-white h-[70px]'>
      {getNavContent()}
    </footer>
  );
}
