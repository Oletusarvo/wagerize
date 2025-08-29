import { Main } from '@/components/ui/main';
import { Spinner } from '@/components/ui/spinner';
import { LoginForm } from '@/features/login/components/login-form';
import { Suspense } from 'react';

export default async function Login() {
  return (
    <div className='flex flex-col items-center justify-center w-full h-full px-default'>
      <Suspense fallback={<Spinner />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
