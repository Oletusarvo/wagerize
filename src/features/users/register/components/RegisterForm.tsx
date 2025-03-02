'use client';

import { InputGroup } from '@/components/ui/InputGroup';
import { useRegisterForm } from '../hooks/useRegisterForm';
import { Button } from '@/components/feature/Button';
import Link from 'next/link';
import { Form } from '@/components/feature/Form';
import { FormHeading } from '@/components/ui/FormHeading';

export function RegisterForm() {
  const { credentials, updateCredentials, onSubmit, status } = useRegisterForm();
  return (
    <Form onSubmit={onSubmit}>
      <FormHeading>Register</FormHeading>
      <InputGroup>
        <label>Email</label>
        <input
          name='email'
          type='email'
          placeholder='Type your email...'
          onChange={updateCredentials}
          value={credentials.email}
          required
        />
      </InputGroup>
      <InputGroup>
        <label>Password</label>
        <input
          name='password1'
          type='password'
          autoComplete='none'
          placeholder='Create a password...'
          onChange={updateCredentials}
          value={credentials.password1}
          required
        />
      </InputGroup>
      <InputGroup>
        <label>Re-type password</label>
        <input
          name='password2'
          type='password'
          autoComplete='none'
          placeholder='Re-type the password...'
          onChange={updateCredentials}
          value={credentials.password2}
          required
        />
      </InputGroup>
      <div className='flex w-full justify-between items-center'>
        <span>
          I have read the <Link href='/'>Terms Of Service.</Link>
        </span>
        <input
          type='checkbox'
          required
        />
      </div>
      <div className='flex flex-col gap-4 w-full items-center'>
        <Button
          fullWidth
          type='submit'
          variant='contained'
          color='accent'
          loading={status === 'loading'}
          disabled={status === 'done' || status === 'loading'}>
          Register
        </Button>
        <Link href='/login'>Already have an account?</Link>
      </div>
    </Form>
  );
}
