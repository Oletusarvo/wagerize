'use client';

import { Spinner } from '@/components/ui/spinner';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    signOut({ redirect: false }).then(() => {
      toast.success('Logged out successfully.');
      router.replace('/');
    });
  }, []);

  return (
    <div className='flex w-full h-full items-center justify-center px-default'>
      <div className='flex gap-4 items-center'>
        <Spinner />
        <span>Loggin out...</span>
      </div>
    </div>
  );
}
