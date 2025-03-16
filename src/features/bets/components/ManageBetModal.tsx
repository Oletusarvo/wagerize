'use client';

import { Button } from '@/components/feature/Button';
import { RadioButton } from '@/components/feature/RadioButton';
import { ToggleProvider } from '@/components/feature/ToggleProvider';
import { Modal } from '@/components/ui/Modal';
import { useList } from '@/hooks/useList';
import { useStatus } from '@/hooks/useStatus';
import { MoreHoriz } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import { endBetAction } from '../actions/endBetAction';
import toast from 'react-hot-toast';
import { Form } from '@/components/feature/Form';
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/features/users/contexts/UserProvider';

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

  return (
    <Modal title='End bet on outcome'>
      <Form onSubmit={onSubmit}>
        <div className='flex flex-col w-full gap-2'>
          <p>{bet.data.description || 'No Description.'}</p>
          {content}
          <Button
            fullWidth
            type='submit'
            loading={status === 'loading'}
            disabled={status === 'loading' || status === 'done' || selectedOutcome === null}>
            End Bet
          </Button>
        </div>
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
