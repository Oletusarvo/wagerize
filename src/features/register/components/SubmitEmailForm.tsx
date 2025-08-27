'use client';

import { Button, LoaderButton } from '@/components/feature/Button';
import { Form } from '@/components/feature/Form';
import { FormHeading } from '@/components/ui/FormHeading';
import { Input } from '@/components/ui/Input';
import { InputGroup } from '@/components/ui/InputGroup';
import { ErrorHelper } from '@/components/ui/InputHelper';
import { AuthError } from '@/features/auth/error/AuthError';
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { Mail } from 'lucide-react';
import { sendVerificationEmailAction } from '../actions/sendVerificationEmailAction';
import { useFormData } from '@/hooks/useFormData';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { name as packageName } from 'betting_app/package.json';

export function SubmitEmailForm() {
  const [payload, updatePayload] = useFormData({
    email: '',
  });

  const [onSubmit, status] = useOnSubmit({
    payload,
    action: async () => await sendVerificationEmailAction(payload),
    onError: res => toast.error(res.error),
    onException: (err: any) => toast.error(err.message),
  });

  console.log(status);
  return (
    <Form
      onSubmit={onSubmit}
      centered>
      <FormHeading>Submit Email</FormHeading>
      <p className='text-sm'>
        In order to register to {packageName}, You must first provide us with your email address.
        <br />
        We will send a verification email to you, which contains a link to the next step of the
        registration process.
      </p>
      <InputGroup>
        <Input
          value={payload.get('email').toString()}
          onChange={updatePayload}
          icon={<Mail />}
          name='email'
          type='email'
          placeholder='Type your email...'
          required
        />
      </InputGroup>
      <div className='flex gap-2 w-full'>
        <Link
          href='/'
          className='w-full'>
          <Button
            variant='outlined'
            color='secondary'
            fullWidth>
            Cancel
          </Button>
        </Link>

        <LoaderButton
          loading={status === 'loading'}
          disabled={status === 'loading' || status === 'success'}
          fullWidth
          type='submit'>
          Send
        </LoaderButton>
      </div>

      {status === AuthError.DUPLICATE_USER ? (
        <ErrorHelper>An account with this email already exists!</ErrorHelper>
      ) : status === AuthError.EMAIL_INVALID ? (
        <ErrorHelper>The email is invalid!</ErrorHelper>
      ) : status === AuthError.USER_QUOTA_FULL ? (
        <ErrorHelper>Unfortunately, we do not accept new users at this time.</ErrorHelper>
      ) : status === 'error' ? (
        <ErrorHelper>An unexpected error occured!</ErrorHelper>
      ) : null}
    </Form>
  );
}
