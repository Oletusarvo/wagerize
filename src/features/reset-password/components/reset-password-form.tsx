'use client';

import { LoaderButton } from '@/components/feature/button';
import { Form } from '@/components/feature/form';
import { FormHeading } from '@/components/ui/form-heading';
import { InputGroup } from '@/components/ui/input-group';
import { ErrorHelper, Helper } from '@/components/ui/input-helper';
import { createContextWithHook } from '@/utils/create-context-with-hook';
import { useResetPasswordForm } from '../hooks/use-reset-password-form';
import { Input } from '@/components/ui/input';
import { Ellipsis, Mail } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export function ResetPasswordForm() {
  const hook = useResetPasswordForm();
  const { onSubmit, status } = hook;
  const token = useSearchParams().get('token');
  const submitDisabled = status === 'loading' || status === 'success';

  return (
    <ResetPasswordContext.Provider value={hook}>
      <Form onSubmit={onSubmit}>
        <FormHeading>Reset Password</FormHeading>
        {token ? <ResetPasword /> : <SendResetEmail />}
        <LoaderButton
          type='submit'
          loading={status === 'loading'}
          disabled={submitDisabled}>
          Send
        </LoaderButton>
        <StatusNotice status={status} />
      </Form>
    </ResetPasswordContext.Provider>
  );
}

function SendResetEmail() {
  return (
    <InputGroup>
      <Input
        icon={<Mail />}
        required
        name='email'
        type='email'
        placeholder='Email'
      />
      <Helper>A link to reset your password will be sent to your email.</Helper>
    </InputGroup>
  );
}

function ResetPasword() {
  const token = useSearchParams().get('token');
  return (
    <>
      <input
        name='token'
        value={token}
        hidden
      />
      <InputGroup>
        <Input
          icon={<Ellipsis />}
          minLength={8}
          type='password'
          name='password1'
          required
          placeholder='New password'
        />
      </InputGroup>
      <InputGroup>
        <Input
          icon={<Ellipsis />}
          type='password'
          name='password2'
          required
          placeholder='Re-type password'
        />
      </InputGroup>
    </>
  );
}

function StatusNotice({ status }) {
  return <ErrorHelper>{status}</ErrorHelper>;
}

const [ResetPasswordContext, useResetPasswordContext] =
  createContextWithHook<ReturnType<typeof useResetPasswordForm>>('ResetPasswordContext');
