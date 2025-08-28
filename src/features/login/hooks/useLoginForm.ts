import { useRecord } from '@/hooks/useRecord';
import { useStatus } from '@/hooks/useStatus';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { loginCredentialsSchema } from '../schemas/loginCredentialsSchema';

export function useLoginForm() {
  const [status, setStatus] = useStatus(['invalid_credentials']);
  const searchParams = useSearchParams();
  const { record: credentials, updateOnChange: updateCredentials } = useRecord({
    email: '',
    password: '',
  });
  const router = useRouter();

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      let currentStatus: typeof status = 'loading';
      setStatus(currentStatus);
      try {
        loginCredentialsSchema.parse(credentials);
        const res = await signIn('Credentials', { ...credentials, redirect: false });
        if (res) {
          if (res.error) {
            if (res.error === 'invalid_email' || res.error === 'invalid_password') {
              currentStatus = 'invalid_credentials';
            } else {
              toast.error('An unexpected error occured!');
              currentStatus = 'error';
            }
          } else {
            currentStatus = 'success';
            toast.success('Login success!');
            const callbackUrl = searchParams.get('callback') || '/app/feed';
            router.replace(callbackUrl);
          }
        }
      } catch (err) {
        toast.error('An unexpected error occured!');
        console.log(err.message);
        currentStatus = 'error';
      } finally {
        setStatus(currentStatus);
      }
    },
    [credentials, setStatus, router]
  );

  return { credentials, status, onSubmit, updateCredentials };
}
