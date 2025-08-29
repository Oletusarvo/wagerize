'use client';

import { Button, LoaderButton } from '@/components/feature/button-temp';
import { Form } from '@/components/feature/form-temp';
import { FormHeading } from '@/components/ui/form-heading';
import { Input } from '@/components/ui/input-temp';
import { InputGroup } from '@/components/ui/input-group';
import { ErrorHelper } from '@/components/ui/input-helper';
import { AuthError } from '@/features/auth/error/auth-error';
import { useOnSubmit } from '@/hooks/use-on-submit';
import { Mail } from 'lucide-react';
import { sendVerificationEmailAction } from '../actions/send-verification-email-action';
import { useFormData } from '@/hooks/use-form-data';
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
