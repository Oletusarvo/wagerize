import { registerUserAction } from '../actions/registerUserAction';
import toast from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';
import { registerCredentialsSchema } from '../schemas/registerCredentialsSchema';
import { AuthError } from '@/features/auth/error/AuthError';
import { parseFormDataUsingSchema } from '@/utils/parseUsingSchema';
import { getParseResultErrorMessage } from '@/utils/getParseResultErrorMessage';
import { sendVerificationEmailAction } from '../actions/sendVerificationEmailAction';
import { useOnSubmit } from '@/hooks/useOnSubmit';

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
      const result = parseFormDataUsingSchema(payload, registerCredentialsSchema);
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
