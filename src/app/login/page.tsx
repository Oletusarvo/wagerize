import { Main } from '@/components/ui/Main';
import { Spinner } from '@/components/ui/Spinner';
import { LoginForm } from '@/features/users/login/components/LoginForm';
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
