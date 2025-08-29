import { Form } from '@/components/feature/form-temp';
import { Modal } from '@/components/ui/modal-temp';
import { useBetContext } from '../providers/bet-provider';
import { OutcomeSelector } from '@/features/bids/components/outcome-selector';
import { useState } from 'react';
import { useOnSubmit } from '@/hooks/use-on-submit';
import { endBetAction } from '../actions/end-bet-action';
import { Button, LoaderButton } from '@/components/feature/button-temp';
import { ToggleProvider } from '@/providers/toggle-provider';
import { useRouter } from 'next/navigation';
import { AuthError } from '@/features/auth/error/auth-error';
import { ErrorHelper } from '@/components/ui/input-helper';
import { BetError } from '../error/bet-error';

export function EndBetModal(props) {
  const { bet, setShowEndBetModal } = useBetContext();
  const [selectedOutcome, setSelectedOutcome] = useState(null);
  const router = useRouter();

  const [onSubmit, status] = useOnSubmit({
    action: async payload => {
      return await endBetAction(bet.id, selectedOutcome);
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
