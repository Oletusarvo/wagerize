'use client';

import { Button } from '@/components/feature/Button';
import { Form } from '@/components/feature/Form';
import { Container } from '@/components/ui/Container';
import { usePlaceBidForm } from '../hooks/usePlaceBidForm';
import { useList } from '@/hooks/useList';
import { RadioButton } from '@/components/feature/RadioButton';
import { Input } from '@/components/ui/Input';
import { ArrowDownward } from '@mui/icons-material';

export function PlaceBidForm({ bet, outcomes }) {
  const {
    id: betId,
    data: { min_raise: minRaise, min_bid: minBid, max_raise: maxRaise },
  } = bet;
  const { onSubmit, setSelectedOutcome, selectedOutcome, status } = usePlaceBidForm(betId, minBid);
  const radioButtons = useList({
    items: outcomes,
    Component: ({ item }) => {
      return (
        <RadioButton
          name='outcome'
          value={item.id}
          selectedValue={selectedOutcome}
          label={item.label}
          onClick={value => setSelectedOutcome(value)}
        />
      );
    },
    deps: [selectedOutcome, setSelectedOutcome],
  });

  return (
    <Form onSubmit={onSubmit}>
      <div className='flex w-full flex-col gap-2'>
        {radioButtons}
        <Input
          icon={<ArrowDownward />}
          name='amount'
          type='number'
          defaultValue={minBid}
          min={minBid}
          step={1}
          max={bet.data.min_bid + (maxRaise || 0)}
        />
        <div className='flex gap-2 w-full'>
          <Button
            fullWidth
            type='submit'
            color='accent'
            loading={status === 'loading'}
            disabled={
              status === 'loading' ||
              status === 'done' ||
              selectedOutcome === null ||
              selectedOutcome === undefined
            }>
            Confirm
          </Button>
        </div>
      </div>
    </Form>
  );
}
