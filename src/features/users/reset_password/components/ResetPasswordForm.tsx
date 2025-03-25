'use client';

import { Button } from '@/components/feature/Button';
import { Form } from '@/components/feature/Form';
import { FormHeading } from '@/components/ui/FormHeading';
import { InputGroup } from '@/components/ui/InputGroup';
import { Helper } from '@/components/ui/InputHelper';
import { createContextWithHook } from '@/utils/createContextWithHook';
import { useResetPasswordForm } from '../hooks/useResetPasswordForm';
import { Suspense } from 'react';
import { Spinner } from '@/components/ui/Spinner';
import { Input } from '@/components/ui/Input';
import { Email, Password } from '@mui/icons-material';

export function ResetPasswordForm() {
  const { newCredentials, updateNewCredentials, onSubmit, token, status, buttonDisabled } =
    useResetPasswordForm();

  return (
    <ResetPasswordContext.Provider value={{ newCredentials, updateNewCredentials }}>
      <Form onSubmit={onSubmit}>
        <FormHeading>Reset Password</FormHeading>
        {token ? <ResetPasword /> : <SendResetEmail />}
        <Button
          type='submit'
          loading={status === 'loading'}
          disabled={buttonDisabled || status === 'loading' || status === 'done'}>
          Send
        </Button>
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
        icon={<Email />}
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
          icon={<Password />}
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
          icon={<Password />}
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
