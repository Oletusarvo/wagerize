'use client';

import { Button, LoaderButton } from '@/components/feature/button';
import { Form } from '@/components/feature/form';
import { usePlaceBidForm } from '../../bets/hooks/use-place-bid-form';
import { useBetContext } from '../../bets/providers/bet-provider';
import { ToggleProvider } from '@/providers/toggle-provider';
import { useBidContext } from '@/features/bids/providers/bid-provider';
import { OutcomeSelector } from './outcome-selector';
import { BidAmountInput } from './bid-amount-input';
import { Modal } from '@/components/ui/modal';

export function PlaceBidForm(props: React.ComponentProps<'form'>) {
  const { bet } = useBetContext();
  const { bid, mustCall } = useBidContext();

  const { onSubmit, setSelectedOutcome, selectedOutcome, status } = usePlaceBidForm();

  const isSubmitDisabled = () => {
    if (status === 'loading' || status === 'success') {
      return true;
    } else if (mustCall) {
      return false;
    }

    return !selectedOutcome;
  };

  return (
    <Modal
      {...props}
      title='Place Bid'>
      <Form
        {...props}
        onSubmit={onSubmit}>
        <div className='flex w-full flex-col gap-2 bg-background-light'>
          <input
            name='bet_id'
            value={bet.id}
            hidden
          />

          {!bid && (
            <OutcomeSelector
              values={bet.outcomes}
              selectedValue={selectedOutcome}
              onChange={value => setSelectedOutcome(value)}
            />
          )}

          <BidAmountInput />
          <div className='flex gap-2 w-full'>
            <ToggleProvider.Trigger>
              <Button
                color='secondary'
                variant='outlined'
                fullWidth>
                Cancel
              </Button>
            </ToggleProvider.Trigger>
            <LoaderButton
              fullWidth
              type='submit'
              color='accent'
              loading={status === 'loading'}
              disabled={isSubmitDisabled()}>
              Confirm
            </LoaderButton>
          </div>
        </div>
      </Form>
    </Modal>
  );
}
