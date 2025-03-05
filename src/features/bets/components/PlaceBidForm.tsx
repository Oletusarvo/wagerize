'use client';

import { Button } from '@/components/feature/Button';
import { Form } from '@/components/feature/Form';
import { Container } from '@/components/ui/Container';
import { usePlaceBidForm } from '../hooks/usePlaceBidForm';

export function PlaceBidForm({ betId, outcomes, minBid }) {
  const { onSubmit, setSelectedOutcome, selectedOutcome, status } = usePlaceBidForm(betId, minBid);
  return (
    <Form onSubmit={onSubmit}>
      <div className='flex w-full flex-col gap-2'>
        {outcomes.map((o, i) => {
          return (
            <Container
              as='div'
              key={`outcome-${i}`}
              onClick={() => setSelectedOutcome(o.id)}>
              <div className='flex w-full justify-between items-center'>
                <h1>{o.label}</h1>
                <input
                  type='radio'
                  name='outcome'
                  checked={selectedOutcome === o.id}
                  onChange={() => setSelectedOutcome(o.id)}
                />
              </div>
            </Container>
          );
        })}

        <Button
          fullWidth
          type='submit'
          color='accent'
          loading={status === 'loading'}
          disabled={status === 'loading'}>
          Confirm
        </Button>
      </div>
    </Form>
  );
}
