import { registerUserAction } from '../actions/register-user-action';
import toast from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';
import { registerCredentialsSchema } from '../schemas/register-credentials-schema';
import { AuthError } from '@/features/auth/error/auth-error';
import { parseFormDataUsingSchema } from '@/utils/parse-form-data-using-schema';
import { getParseResultErrorMessage } from '@/utils/get-parse-result-error-message';
import { sendVerificationEmailAction } from '../actions/send-verification-email-action';
import { useOnSubmit } from '@/hooks/use-on-submit';
import { parseFormData } from '@/utils/parse-form-data';

export function useRegisterForm() {
  const token = useSearchParams().get('token');

  const [onSubmitCredentials, submitCredentialsStatus] = useOnSubmit({
    statuses: [...Object.values(AuthError), 'error'],
    action: async payload => {
      payload.set('token', token);
      return await registerUserAction(payload);
    },
    onSuccess: () => {
      toast.success('Registration succeeded!');
    },
    onError: res => {
      if (res.error === AuthError.USER_QUOTA_FULL) {
        toast.error('Unfortunately, we do not allow registration of any more users at this time.');
      }
    },
    onException: err => toast.error('An unexpected error occured!'),
    onParse: payload => {
      const data = parseFormData(payload);
      const result = registerCredentialsSchema.safeParse(data);
      return !result.success ? getParseResultErrorMessage(result) : null;
    },
  });

  const [onSubmitEmail, submitEmailStatus] = useOnSubmit({
    statuses: [AuthError.USER_QUOTA_FULL],
    action: async payload => await sendVerificationEmailAction(payload),
  });

  const onSubmit = token ? onSubmitCredentials : onSubmitEmail;
  return { onSubmit, submitEmailStatus, submitCredentialsStatus, token };
}
