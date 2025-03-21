import { useRecord } from '@/hooks/useRecord';
import { useStatus } from '@/hooks/useStatus';
import { useCallback, useEffect, useMemo } from 'react';
import { registerUserAction } from '../actions/registerUserAction';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { RegisterError } from '../types/RegisterError';
import { registerCredentialsSchema } from '../schemas/registerCredentialsSchema';
import { z } from 'zod';

const dateOfBirthSchema = z
  .string()
  .date()
  .refine(
    date => {
      const now = new Date();
      const dob = new Date(date);
      const age = now.getFullYear() - dob.getFullYear();
      return age >= 18;
    },
    { message: 'You must be 18 years or older!' }
  );

export function useRegisterForm() {
  const { record: credentials, updateOnChange: updateCredentials } = useRecord({
    dateOfBirth: '',
    email: '',
    password1: '',
    password2: '',
  });
  const router = useRouter();
  const [status, setStatus] = useStatus([
    'password_mismatch',
    'password_too_long',
    'password_too_short',
    'invalid_password_format',
    'user_exists',
    'underage',
  ]);

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      console.log('onSubmit');
      e.preventDefault();
      let currentStatus: typeof status = 'loading';
      setStatus(currentStatus);
      try {
        const parseResult = registerCredentialsSchema.safeParse(credentials);
        if (parseResult.error) {
          const error = parseResult.error.errors.at(0);
          console.log(error);
          currentStatus = error.message as typeof status;
        } else {
          const result = await registerUserAction(credentials);
          if (result.code === 0) {
            toast.success('Registration succeeded!');
            router.replace(`/register/verify?email=${credentials.email}`);
            currentStatus = 'done';
          } else {
            if (result.code === RegisterError.USER_COUNT) {
              toast.error(
                'Unfortunately, we do not allow registration of any more users at this point.'
              );
              currentStatus = 'error';
            } else if (result.code === RegisterError.DUPLICATE_USER) {
              currentStatus = 'user_exists';
            } else if (result.code === RegisterError.INVALID_PASSWORD_FORMAT) {
              currentStatus = 'invalid_password_format';
            } else {
              currentStatus = 'error';
            }
          }
        }
      } catch (err) {
        toast.error('An unexpected error occured!');
        currentStatus = 'error';
      } finally {
        setStatus(currentStatus);
      }
    },
    [setStatus, router, registerUserAction, credentials]
  );

  const registerButtonDisabled = useMemo(() => {
    return status === 'done' || status === 'loading';
  }, [status]);

  useEffect(() => {
    if (dateOfBirthSchema.safeParse(credentials.dateOfBirth).success === false) {
      setStatus('underage');
    } else {
      setStatus('idle');
    }
  }, [credentials.dateOfBirth, setStatus]);

  return { credentials, updateCredentials, onSubmit, status, registerButtonDisabled };
}
