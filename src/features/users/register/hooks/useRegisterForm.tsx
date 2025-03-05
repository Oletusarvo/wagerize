import { useRecord } from '@/hooks/useRecord';
import { useStatus } from '@/hooks/useStatus';
import { useCallback } from 'react';
import { registerUserAction } from '../actions/registerUserAction';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { RegisterError } from '../types/RegisterError';
import { registerCredentialsSchema } from '../schemas/registerCredentialsSchema';

export function useRegisterForm() {
  const { record: credentials, updateOnChange: updateCredentials } = useRecord({
    email: '',
    password1: '',
    password2: '',
  });
  const router = useRouter();
  const [status, setStatus] = useStatus();

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      let currentStatus: typeof status = 'loading';
      setStatus(currentStatus);
      try {
        registerCredentialsSchema.parse(credentials);
        const result = await registerUserAction(credentials);
        if (result.code === 0) {
          toast.success('Registration succeeded!');
          router.replace('/login');
          currentStatus = 'done';
        } else {
          if (result.code === RegisterError.DUPLICATE_USER) {
            toast.error('A user with the provided email already exists!');
          }
          currentStatus = 'error';
        }
      } catch (err) {
        console.log(err.message);
        toast.error('An unknown error occured!');
        currentStatus = 'error';
      } finally {
        setStatus(currentStatus);
      }
    },
    [setStatus, router, registerUserAction, credentials]
  );

  return { credentials, updateCredentials, onSubmit, status };
}
