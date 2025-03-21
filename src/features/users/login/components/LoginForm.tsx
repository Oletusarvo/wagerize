'use client';

import { Form } from '@/components/feature/Form';
import { useLoginForm } from '../hooks/useLoginForm';
import { InputGroup } from '@/components/ui/InputGroup';
import { Button } from '@/components/feature/Button';
import { FormHeading } from '@/components/ui/FormHeading';
import Link from 'next/link';
import { ErrorHelper } from '@/components/ui/InputHelper';
import { Input } from '@/components/ui/Input';
import { Email, Password } from '@mui/icons-material';

export function LoginForm() {
  const { credentials, updateCredentials, onSubmit, status } = useLoginForm();
  return (
    <Form onSubmit={onSubmit}>
      <FormHeading>Login</FormHeading>
      <InputGroup>
        <label>Email</label>
        <Input
          icon={<Email />}
          placeholder='Type your email...'
          name='email'
          type='email'
          value={credentials.email}
          onChange={updateCredentials}
          required
        />
      </InputGroup>
      <InputGroup>
        <label>Password</label>
        <Input
          icon={<Password />}
          placeholder='Type your password...'
          name='password'
          type='password'
          value={credentials.password}
          onChange={updateCredentials}
          required
        />
        {status === 'invalid_credentials' && <ErrorHelper>Invalid credentials!</ErrorHelper>}
      </InputGroup>
      <div className='w-full flex flex-col gap-4 items-center'>
        <Button
          fullWidth
          variant='contained'
          color='accent'
          loading={status === 'loading'}
          disabled={status === 'loading' || status === 'done'}>
          Login
        </Button>
        <Link
          href='/login/reset'
          className='bold'>
          Forgot Password?
        </Link>
        <Link
          href='/register'
          className='bold'>
          Don't have an account?
        </Link>
      </div>
    </Form>
  );
}
