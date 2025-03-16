import { Main } from '@/components/ui/Main';
import { Spinner } from '@/components/ui/Spinner';
import { LoginForm } from '@/features/users/login/components/LoginForm';
import { Suspense } from 'react';

export default async function Login() {
  return (
    <Main centered>
      <Suspense fallback={<Spinner />}>
        <LoginForm />
      </Suspense>
    </Main>
  );
}
