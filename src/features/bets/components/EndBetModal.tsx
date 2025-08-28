import { Form } from '@/components/feature/Form';
import { Modal } from '@/components/ui/Modal';
import { useBetContext } from '../providers/BetProvider';
import { OutcomeSelector } from '@/features/bids/components/OutcomeSelector';
import { useState } from 'react';
import { useOnSubmit } from '@/hooks/useOnSubmit';
import { endBetAction } from '../actions/endBetAction';
import { Button, LoaderButton } from '@/components/feature/Button';
import { ToggleProvider } from '@/providers/ToggleProvider';
import { useRouter } from 'next/navigation';
import { AuthError } from '@/features/auth/error/AuthError';
import { ErrorHelper } from '@/components/ui/InputHelper';
import { BetError } from '../error/BetError';

export function EndBetModal(props) {
  const { bet, setShowEndBetModal } = useBetContext();
  const [selectedOutcome, setSelectedOutcome] = useState(null);
  const router = useRouter();

  const [onSubmit, status] = useOnSubmit({
    action: async payload => {
      await endBetAction(bet.id, selectedOutcome);
      return { success: true };
    },
    onSuccess: () => {
      setShowEndBetModal(false);
      router.replace('/app/feed');
    },
  });

  return (
    <Modal
      {...props}
      title='End Bet'
      onClose={() => setShowEndBetModal(false)}>
      <Form onSubmit={onSubmit}>
        <div className='flex gap-2 w-full flex-col'>
          <OutcomeSelector
            selectedValue={selectedOutcome}
            values={bet.outcomes}
            onChange={val => setSelectedOutcome(val)}
          />
        </div>

        <div className='flex gap-2 w-full'>
          <ToggleProvider.Trigger>
            <Button
              fullWidth
              variant='outlined'
              color='secondary'>
              Cancel
            </Button>
          </ToggleProvider.Trigger>

          <LoaderButton
            fullWidth
            loading={status === 'loading'}
            disabled={status === 'success' || status === 'loading'}>
            Confirm
          </LoaderButton>
        </div>
        <StatusNotice status={status} />
      </Form>
    </Modal>
  );
}

function StatusNotice({ status }) {
  return status === AuthError.UNAUTHORIZED ? (
    <ErrorHelper>Only the author can end a bet!</ErrorHelper>
  ) : status === BetError.ACTIVE ? (
    <ErrorHelper>The bet has not yet expired; cannot end!</ErrorHelper>
  ) : status === 'error' ? (
    <ErrorHelper>An unexpected error occured!</ErrorHelper>
  ) : null;
}
