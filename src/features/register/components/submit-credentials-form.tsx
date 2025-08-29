'use client';

import { Button, LoaderButton } from '@/components/feature/button';
import { Form } from '@/components/feature/form';
import { FormHeading } from '@/components/ui/form-heading';
import { Input } from '@/components/ui/input';
import { InputGroup } from '@/components/ui/input-group';
import { ErrorHelper, Helper } from '@/components/ui/input-helper';
import { AuthError } from '@/features/auth/error/auth-error';
import { useOnSubmit } from '@/hooks/use-on-submit';
import { AtSign, Calendar, Ellipsis } from 'lucide-react';
import Link from 'next/link';
import { registerUserAction } from '../actions/register-user-action';
import { useFormData } from '@/hooks/use-form-data';
import { parseFormDataUsingSchema } from '@/utils/parse-form-data-using-schema';
import { registerCredentialsSchema } from '../schemas/register-credentials-schema';
import { getParseResultErrorMessage } from '@/utils/get-parse-result-error-message';
import { useSearchParams } from 'next/navigation';
import { name as packageName } from 'betting_app/package.json';
import toast from 'react-hot-toast';
import { parseFormData } from '@/utils/parse-form-data';

export function SubmitCredentialsForm() {
  const token = useSearchParams().get('token');
  const [payload, updatePayload] = useFormData({
    dateOfBirth: '',
    username: '',
    password1: '',
    password2: '',
    tos_accepted: false,
    token,
  });

  const [onSubmit, status] = useOnSubmit({
    action: async payload => {
      console.log('payload at action: ', payload);
      return await registerUserAction(payload);
    },
    onParse: payload => {
      const data = parseFormData(payload);
      const parseResult = registerCredentialsSchema.safeParse(data);
      return (!parseResult.success ? getParseResultErrorMessage(parseResult) : null) as
        | string
        | null;
    },
    onException: (err: any) => toast.error(err.message),
    onSuccess: () => toast.success('Registration succeeded!'),
  });

  console.log(status);
  return (
    <Form
      onSubmit={onSubmit}
      centered>
      <FormHeading>Create Credentials</FormHeading>
      <input
        name='token'
        hidden
        value={token}
      />
      <InputGroup>
        <Input
          icon={<Calendar />}
          className='w-full'
          name='dateOfBirth'
          type='date'
          required
        />
        {status === AuthError.UNDERAGE ? (
          <ErrorHelper>You must be 18 years or older!</ErrorHelper>
        ) : (
          <Helper>All {packageName} users must be at least 18 years old.</Helper>
        )}
      </InputGroup>
      <InputGroup>
        <Input
          icon={<AtSign />}
          name='username'
          placeholder='Username'
          required
        />
        {status === AuthError.DUPLICATE_USER && (
          <ErrorHelper>An account with this email already exists!</ErrorHelper>
        )}
      </InputGroup>
      <InputGroup>
        <Input
          icon={<Ellipsis />}
          name='password1'
          type='password'
          autoComplete='none'
          placeholder='Create a password...'
          required
        />
      </InputGroup>
      <InputGroup>
        <Input
          icon={<Ellipsis />}
          name='password2'
          type='password'
          autoComplete='none'
          placeholder='Re-type the password...'
          required
        />
      </InputGroup>
      <InputGroup>
        {' '}
        <div className='flex w-full justify-between items-center text-sm'>
          <span>
            I have read, and accept the{' '}
            <Link
              className='font-semibold'
              href='/tos'
              target='_blank'>
              Terms Of Service,
            </Link>
          </span>
          <input
            type='checkbox'
            required
          />
        </div>
      </InputGroup>
      <div className='flex flex-col gap-4 w-full items-center'>
        <div className='flex gap-2 w-full'>
          <Link
            href='/'
            className='w-full'>
            <Button
              type='button'
              variant='outlined'
              color='secondary'
              fullWidth>
              Cancel
            </Button>
          </Link>

          <LoaderButton
            fullWidth
            type='submit'
            variant='contained'
            color='accent'
            loading={status === 'loading'}
            disabled={status === 'loading' || status === 'success'}>
            Register
          </LoaderButton>
        </div>
      </div>
      {status === AuthError.PASSWORD_MISMATCH ? (
        <ErrorHelper>The passwords do not match!</ErrorHelper>
      ) : status === AuthError.PASSWORD_TOO_LONG ? (
        <ErrorHelper>A password can only have 16 characters!</ErrorHelper>
      ) : status === AuthError.PASSWORD_TOO_SHORT ? (
        <ErrorHelper>A password must be at least 8 characters long!</ErrorHelper>
      ) : status === AuthError.PASSWORD_INVALID_FORMAT ? (
        <ErrorHelper>A password must contain letters, numbers and special characters!</ErrorHelper>
      ) : status === AuthError.TOKEN_INVALID ? (
        <ErrorHelper>The token is invalid!</ErrorHelper>
      ) : null}
    </Form>
  );
}
