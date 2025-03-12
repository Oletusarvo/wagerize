import { Spinner } from '@/components/ui/Spinner';
import { ResetPasswordForm } from '@/features/users/reset_password/components/ResetPasswordForm';
import { Suspense } from 'react';

export default async function ResetPasswordPage() {
  return (
    <main className='flex flex-col items-center justify-center flex-1 w-full lg:px-default xs:px-4'>
      <Suspense fallback={<Spinner />}>
        <ResetPasswordForm />
      </Suspense>
    </main>
  );
}
