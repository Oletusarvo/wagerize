import { FormHeading } from '@/components/ui/FormHeading';
import Link from 'next/link';
import React from 'react';

export default async function RegisterSuccessPage({ searchParams }) {
  const { email } = await searchParams;

  return (
    <div className='flex flex-col gap-4 w-full py-4 px-default h-full'>
      <FormHeading>Verify your email</FormHeading>
      <p>
        A verification email has been sent to <strong>{email}</strong>. Check your inbox for the
        message, and click on the link in it to verify your account. Please note that unverified
        accounts are subject to deletion without notice.
      </p>
      <Link
        href={`/api/public/users/resend_verification_email?email=${email}`}
        className='bold'>
        Resend verification email
      </Link>
    </div>
  );
}
