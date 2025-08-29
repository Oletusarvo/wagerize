'use client';

import { SubmitEmailForm } from './submit-email-form';
import { SubmitCredentialsForm } from './submit-credentials-form';
import { useSearchParams } from 'next/navigation';

export function RegisterForm() {
  const token = useSearchParams().get('token');
  return !token ? <SubmitEmailForm /> : <SubmitCredentialsForm />;
}
