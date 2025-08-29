import { useRouter, useSearchParams } from 'next/navigation';
import { resetPasswordAction } from '../actions/reset-password-action';
import toast from 'react-hot-toast';
import { sendPasswordResetLinkAction } from '../actions/send-password-reset-link-action';
import { useOnSubmit } from '@/hooks/use-on-submit';
import { passwordResetSchema } from '../schemas/password-reset-schema';
import { parseFormData } from '@/utils/parse-form-data';
import { getParseResultErrorMessage } from '@/utils/get-parse-result-error-message';

export function useResetPasswordForm() {
  const token = useSearchParams().get('token');
  const router = useRouter();

  const [onSubmitNewCredentials, credentialsStatus] = useOnSubmit({
    onParse: payload => {
      const parsed = parseFormData(payload);
      const result = passwordResetSchema.safeParse(parsed);
      return !result.success ? (getParseResultErrorMessage(result) as string) : null;
    },
    action: async payload => {
      return await resetPasswordAction(payload);
    },
    onSuccess: res => {
      toast.success('Password reset successfully!');
      router.push('/login');
    },
    onError: res => {
      toast.error('An unexpected error occured!');
    },
  });

  const [onSubmitEmail, emailStatus] = useOnSubmit({
    action: async payload => {
      return await sendPasswordResetLinkAction(payload);
    },
    onSuccess: res => {
      toast.success('Reset link sent! Please check your email.');
    },
    onError: res => {
      toast.error('An unexpected error occured!');
    },
  });

  const onSubmit = token ? onSubmitNewCredentials : onSubmitEmail;
  const status = token ? credentialsStatus : emailStatus;
  return { onSubmit, status };
}
