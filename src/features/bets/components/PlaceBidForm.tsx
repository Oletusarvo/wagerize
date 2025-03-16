'use client';

import { Button } from '@/components/feature/Button';
import { Form } from '@/components/feature/Form';
import { Container } from '@/components/ui/Container';
import { usePlaceBidForm } from '../hooks/usePlaceBidForm';
import { useList } from '@/hooks/useList';
import { RadioButton } from '@/components/feature/RadioButton';

export function PlaceBidForm({ betId, outcomes, minBid }) {
  const { onSubmit, setSelectedOutcome, selectedOutcome, status } = usePlaceBidForm(betId, minBid);
  const radioButtons = useList({
    items: outcomes,
    Component: ({ item }) => {
      console.log(item);
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
    </Form>
  );
}
