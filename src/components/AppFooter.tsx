'use client';

import { useUserContext } from '@/features/users/contexts/UserProvider';
import { Add, ArrowBack, Dashboard, Login, Person } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Icon } from './ui/Icon';
import { Spinner } from './ui/Spinner';

export function AppFooter() {
  const { status: sessionStatus } = useUserContext();
  const pathname = usePathname().split('/').at(-1);
  const router = useRouter();

  const getNavContent = () => {
    if (sessionStatus === 'authenticated') {
      return (
        <>
          <Link href='/auth/dashboard'>
            <IconButton>
              <Icon
                Component={Dashboard}
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
        </>
      );
    } else if (sessionStatus === 'unauthenticated') {
      return (
        <Link href='/login'>
          <IconButton>
            <Icon
              Component={Login}
              size='large'
            />
          </IconButton>
        </Link>
      );
    } else {
      return <Spinner />;
    }
  };

  return (
    <footer className='lg:px-default xs:px-4 py-4 z-20 app-footer flex gap-8 items-center justify-center bg-white'>
      {pathname === 'dashboard' || pathname === '' ? (
        getNavContent()
      ) : (
        <IconButton onClick={() => router.back()}>
          <Icon
            Component={ArrowBack}
            size='large'
          />
        </IconButton>
      )}
    </footer>
  );
}
