'use client';

import { LoaderButton } from '@/components/feature/Button';
import { Form } from '@/components/feature/Form';
import { FormHeading } from '@/components/ui/FormHeading';
import { InputGroup } from '@/components/ui/InputGroup';
import { Helper } from '@/components/ui/InputHelper';
import { createContextWithHook } from '@/utils/createContextWithHook';
import { useResetPasswordForm } from '../hooks/useResetPasswordForm';
import { Input } from '@/components/ui/Input';
import { Ellipsis, Mail } from 'lucide-react';

export function ResetPasswordForm() {
  const { newCredentials, updateNewCredentials, onSubmit, token, status, buttonDisabled } =
    useResetPasswordForm();

  return (
    <ResetPasswordContext.Provider value={{ newCredentials, updateNewCredentials }}>
      <Form onSubmit={onSubmit}>
        <FormHeading>Reset Password</FormHeading>
        {token ? <ResetPasword /> : <SendResetEmail />}
        <LoaderButton
          type='submit'
          loading={status === 'loading'}
          disabled={buttonDisabled || status === 'loading' || status === 'done'}>
          Send
        </LoaderButton>
      </Form>
    </ResetPasswordContext.Provider>
  );
}

function SendResetEmail() {
  const { newCredentials, updateNewCredentials } = useResetPasswordContext();
  return (
    <InputGroup>
      <label>Email</label>
      <Input
        icon={<Mail />}
        required
        name='email'
        type='email'
        placeholder='Type your email...'
        value={newCredentials.email}
        onChange={updateNewCredentials}
      />
      <Helper>A link to reset your password will be sent to your email.</Helper>
    </InputGroup>
  );
}

function ResetPasword() {
  const { newCredentials, updateNewCredentials } = useResetPasswordContext();
  return (
    <>
      <InputGroup>
        <label>New Password</label>
        <Input
          icon={<Ellipsis />}
          minLength={8}
          value={newCredentials.password1}
          onChange={updateNewCredentials}
          type='password'
          name='password1'
          required
          placeholder='Type a new password...'
        />
      </InputGroup>
      <InputGroup>
        <label>Repeat New Password</label>
        <Input
          icon={<Ellipsis />}
          value={newCredentials.password2}
          onChange={updateNewCredentials}
          type='password'
          name='password2'
          required
          placeholder='Type the password again...'
        />
      </InputGroup>
    </>
  );
}

const [ResetPasswordContext, useResetPasswordContext] = createContextWithHook<{
  newCredentials: any;
  updateNewCredentials: any;
}>('ResetPasswordContext');
