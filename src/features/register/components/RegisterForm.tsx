'use client';

import { SubmitEmailForm } from './SubmitEmailForm';
import { SubmitCredentialsForm } from './SubmitCredentialsForm';
import { useSearchParams } from 'next/navigation';

export function RegisterForm() {
  const token = useSearchParams().get('token');
  return !token ? <SubmitEmailForm /> : <SubmitCredentialsForm />;
}
