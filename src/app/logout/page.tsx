'use client';

import { Spinner } from '@/components/ui/Spinner';
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
    <main className='flex w-full flex-1 items-center justify-center'>
      <div className='flex gap-4 items-center'>
        <Spinner />
        <span>Loggin out...</span>
      </div>
    </main>
  );
}
