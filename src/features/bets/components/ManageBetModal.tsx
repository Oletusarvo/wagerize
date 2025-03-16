'use client';

import { Button } from '@/components/feature/Button';
import { RadioButton } from '@/components/feature/RadioButton';
import { ToggleProvider } from '@/components/feature/ToggleProvider';
import { Modal } from '@/components/ui/Modal';
import { useList } from '@/hooks/useList';
import { useStatus } from '@/hooks/useStatus';
import { MoreHoriz } from '@mui/icons-material';
import { IconButton, Switch } from '@mui/material';
import { useState } from 'react';
import { endBetAction } from '../actions/endBetAction';
import toast from 'react-hot-toast';
import { Form } from '@/components/feature/Form';
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/features/users/contexts/UserProvider';
import { freezeBetAction } from '../actions/freezeBetAction';
import { Spinner } from '@/components/ui/Spinner';

export function ManageBetModal({ bet, outcomes }) {
  const [selectedOutcome, setSelectedOutcome] = useState(null);
  const { updateSession } = useUserContext();
  const [status, setStatus] = useStatus();
  const router = useRouter();
  const betId = bet.id;
  const content = useList({
    items: outcomes,
    Component: ({ item }) => {
      return (
        <RadioButton
          name='outcome_id'
          value={item.id}
          selectedValue={selectedOutcome}
          label={item.label}
          onClick={value => setSelectedOutcome(value)}
        />
      );
    },
    deps: [selectedOutcome, setSelectedOutcome],
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedOutcome === null) {
      toast.error('Must select outcome!');
      return;
    }

    let currentStatus: typeof status = 'loading';
    setStatus(currentStatus);

    const result = await endBetAction(betId, selectedOutcome);
    if (result.code === 0) {
      toast.success('Bet closed!');
      updateSession();
      currentStatus = 'done';
      router.replace('/auth/dashboard');
    } else {
      currentStatus = 'error';
      toast.error('An unexpected error occured!');
    }

    setStatus(currentStatus);
  };

  const freeze = async () => {
    if (status === 'loading') {
      return;
    }
    setStatus('loading');
    await freezeBetAction(bet.id, !bet.data.is_frozen);
    setStatus('idle');
  };

  const isExpired = Date.now() >= new Date(bet.expires_at).getTime();

  return (
    <Modal title='Manage Challenge'>
      <Form onSubmit={onSubmit}>
        <p>{bet.data.description || 'No Description.'}</p>

        {isExpired ? (
          <Fieldset>
            <legend>End Challenge</legend>
            {content}
            <Button
              fullWidth
              type='submit'
              loading={status === 'loading'}
              disabled={
                status === 'loading' ||
                status === 'done' ||
                selectedOutcome === null ||
                selectedOutcome === undefined
              }>
              End
            </Button>
          </Fieldset>
        ) : (
          <Fieldset>
            <legend>Settings</legend>
            <div className='flex w-full items-center justify-between'>
              <label>Freeze</label>
              {status === 'loading' ? (
                <Spinner />
              ) : (
                <input
                  type='checkbox'
                  onChange={freeze}
                  checked={bet.data.is_frozen}
                />
              )}
            </div>
          </Fieldset>
        )}
      </Form>
    </Modal>
  );
}

export function ManageBetButton({ bet, outcomes }) {
  return (
    <ToggleProvider>
      <ToggleProvider.Trigger>
        <IconButton>
          <MoreHoriz />
        </IconButton>
      </ToggleProvider.Trigger>
      <ToggleProvider.Target>
        <ManageBetModal
          bet={bet}
          outcomes={outcomes}
        />
      </ToggleProvider.Target>
    </ToggleProvider>
  );
}

function Fieldset({ children }) {
  return (
    <fieldset className='flex flex-col w-full gap-2 border-border border px-2 py-4 rounded-md'>
      {children}
    </fieldset>
  );
}
