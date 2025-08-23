import { Spinner } from '@/components/ui/Spinner';
import { ResetPasswordForm } from '@/features/reset_password/components/ResetPasswordForm';
import { Suspense } from 'react';

export default async function ResetPasswordPage() {
  return (
    <div className='flex flex-col items-center justify-center flex-1 w-full px-default'>
      <Suspense fallback={<Spinner />}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
