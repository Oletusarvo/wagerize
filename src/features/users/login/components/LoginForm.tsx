'use client';

import { Form } from '@/components/feature/Form';
import { useLoginForm } from '../hooks/useLoginForm';
import { InputGroup } from '@/components/ui/InputGroup';
import { Button } from '@/components/feature/Button';
import { FormHeading } from '@/components/ui/FormHeading';
import Link from 'next/link';

export function LoginForm() {
  const { credentials, updateCredentials, onSubmit, status } = useLoginForm();
  return (
    <Form onSubmit={onSubmit}>
      <FormHeading>Login</FormHeading>
      <InputGroup>
        <label>Email</label>
        <input
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
        <input
          placeholder='Type your password...'
          name='password'
          type='password'
          value={credentials.password}
          onChange={updateCredentials}
          required
        />
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
        <Link href='/register'>Don't have an account?</Link>
      </div>
    </Form>
  );
}
