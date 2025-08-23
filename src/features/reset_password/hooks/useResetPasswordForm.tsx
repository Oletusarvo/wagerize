import { useRecord } from '@/hooks/useRecord';
import { useStatus } from '@/hooks/useStatus';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { resetPasswordAction } from '../actions/resetPasswordAction';
import toast from 'react-hot-toast';
import { sendPasswordResetLinkAction } from '../actions/sendPasswordResetLinkAction';
import { z } from 'zod';

const emailSchema = z.string().email();

export function useResetPasswordForm() {
  const token = useSearchParams().get('token');
  const router = useRouter();
  const { record: newCredentials, updateOnChange: updateNewCredentials } = useRecord({
    email: '',
    password1: '',
    password2: '',
  });

  const [status, setStatus] = useStatus();

  const buttonDisabled = useMemo(() => {
    if (!token) {
      const result = emailSchema.safeParse(newCredentials.email);
      return result.success !== true;
    } else {
      return false;
    }
  }, [newCredentials, emailSchema, token]);

  const onSubmit = useCallback(
    async (e: any) => {
      e.preventDefault();
      let currentStatus: typeof status = 'loading';
      setStatus(currentStatus);

      if (token) {
        if (newCredentials.password1 !== newCredentials.password2) {
          toast.error('Passwords do not match!');
        }

        const result = await resetPasswordAction(token, { password: newCredentials.password1 });
        if (result.code === 0) {
          toast.success('Password reset successfully!');
          currentStatus = 'done';
          router.replace('/login');
        } else {
          toast.error('An unexpected error occured!');
          currentStatus = 'error';
        }
      } else {
        const result = await sendPasswordResetLinkAction(newCredentials.email);
        if (result.code === 0) {
          toast.success('Reset link sent! Please check your email.');
          currentStatus = 'done';
        } else {
          toast.error('An unexpected error occured!');
          currentStatus = 'error';
        }
      }

      setStatus(currentStatus);
    },
    [status, toast, sendPasswordResetLinkAction, setStatus, newCredentials]
  );

  return { newCredentials, updateNewCredentials, onSubmit, token, status, buttonDisabled };
}
