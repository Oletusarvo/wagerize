'use client';

import { Form } from '@/components/feature/Form';
import { FormHeading } from '@/components/ui/FormHeading';
import { InputGroup } from '@/components/ui/InputGroup';
import { useUserContext } from '../../contexts/UserProvider';
import { Separator } from '@/components/ui/Separator';
import { Button } from '@/components/feature/Button';
import { IconButton } from '@mui/material';
import { Icon } from '@/components/ui/Icon';
import { Check } from '@mui/icons-material';
import { useStatus } from '@/hooks/useStatus';
import { deleteUserAction } from '../actions/deleteUserAction';
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function AccountSettingsForm() {
  const { user, status: sessionStatus } = useUserContext();
  const [status, setStatus] = useStatus();
  const router = useRouter();

  const deleteAccount = async () => {
    const c = confirm('Are you absolutely sure you want to delete you account?');
    if (!c) return;

    let currentStatus: typeof status = 'loading';
    setStatus(currentStatus);

    try {
      const result = await deleteUserAction();
      if (result.code === 0) {
        toast.success('Account deleted! Logging you out...');
        signOut({ redirect: false }).then(() => router.replace('/'));
        currentStatus = 'done';
      } else {
        toast.error(
          'Account deletion failed! If you have open bets, close them first, and try again.'
        );
        currentStatus = 'error';
      }
    } finally {
      setStatus(currentStatus);
    }
  };

  return (
    <div className='flex flex-col gap-4 w-full flex-1'>
      <FormHeading>Settings</FormHeading>
      <p>Currently only account deletion is supported.</p>

      <Button
        loading={status === 'loading'}
        disabled={status === 'loading' || status === 'done'}
        onClick={deleteAccount}
        type='button'
        fullWidth>
        Delete account
      </Button>
    </div>
  );
}

function UpdateEmailForm() {
  const { user, status: sessionStatus } = useUserContext();
  return (
    <Form>
      <InputGroup>
        <label>Email</label>
        <div className='flex w-full gap-2'>
          <input
            type='email'
            placeholder='Type a new email...'
            value={user?.email}
            className='flex-1'
            disabled
          />
          <IconButton>
            <Icon Component={Check} />
          </IconButton>
        </div>
      </InputGroup>
    </Form>
  );
}

function UpdatePasswordForm() {
  const { user, status: sessionStatus } = useUserContext();
  return (
    <Form>
      <InputGroup>
        <label>Password</label>
        <div className='flex w-full gap-2'>
          <input
            type='password'
            autoComplete='new-password webauthn'
            placeholder='Type a new password...'
            className='flex-1'
            disabled
          />
          <IconButton>
            <Icon Component={Check} />
          </IconButton>
        </div>
      </InputGroup>
    </Form>
  );
}
