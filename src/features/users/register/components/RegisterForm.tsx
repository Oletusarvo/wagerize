'use client';

import { InputGroup } from '@/components/ui/InputGroup';
import { useRegisterForm } from '../hooks/useRegisterForm';
import { Button } from '@/components/feature/Button';
import Link from 'next/link';
import { Form } from '@/components/feature/Form';
import { FormHeading } from '@/components/ui/FormHeading';
import { ErrorHelper, Helper } from '@/components/ui/InputHelper';
import { createContextWithHook } from '@/utils/createContextWithHook';
import { Input } from '@/components/ui/Input';
import { CalendarMonth, Email, Password } from '@mui/icons-material';

export function RegisterForm() {
  const { credentials, updateCredentials, onSubmit, status, registerButtonDisabled } =
    useRegisterForm();

  return (
    <Form onSubmit={onSubmit}>
      <FormHeading>Register</FormHeading>
      <InputGroup>
        <label>Date Of Birth</label>
        <Input
          icon={<CalendarMonth />}
          className='w-full'
          name='dateOfBirth'
          type='date'
          required
          onChange={updateCredentials}
          value={credentials.dateOfBirth}
        />
        {status === 'underage' && <ErrorHelper>You must be 18 years or older!</ErrorHelper>}
      </InputGroup>
      <InputGroup>
        <label>Email</label>
        <Input
          icon={<Email />}
          name='email'
          type='email'
          placeholder='Type your email...'
          onChange={updateCredentials}
          value={credentials.email}
          required
        />
        {status === 'user_exists' && (
          <ErrorHelper>An account with this email already exists!</ErrorHelper>
        )}
      </InputGroup>
      <InputGroup>
        <label>Password</label>
        <Input
          icon={<Password />}
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
        <Input
          icon={<Password />}
          name='password2'
          type='password'
          autoComplete='none'
          placeholder='Re-type the password...'
          onChange={updateCredentials}
          value={credentials.password2}
          required
        />
        {status === 'password_mismatch' ? (
          <ErrorHelper>The passwords do not match!</ErrorHelper>
        ) : status === 'password_too_long' ? (
          <ErrorHelper>A password can only have 16 characters!</ErrorHelper>
        ) : status === 'password_too_short' ? (
          <ErrorHelper>A password must be at least 8 characters long!</ErrorHelper>
        ) : status === 'invalid_password_format' ? (
          <ErrorHelper>
            A password must contain letters, numbers and special characters!
          </ErrorHelper>
        ) : null}
      </InputGroup>
      <InputGroup>
        {' '}
        <div className='flex w-full justify-between items-center'>
          <span>
            I have read the{' '}
            <Link
              className='font-semibold'
              href='/tos'
              target='_blank'>
              Terms Of Service,
            </Link>{' '}
            and{' '}
            <Link
              className='font-semibold'
              href='/privacy'
              target='_blank'>
              Privacy Policy
            </Link>
          </span>
          <input
            type='checkbox'
            required
          />
        </div>
      </InputGroup>

      <div className='flex flex-col gap-4 w-full items-center'>
        <Button
          fullWidth
          type='submit'
          variant='contained'
          color='accent'
          loading={status === 'loading'}
          disabled={registerButtonDisabled}>
          Register
        </Button>
        <Link
          href='/login'
          className='bold'>
          Already have an account?
        </Link>
      </div>
    </Form>
  );
}
