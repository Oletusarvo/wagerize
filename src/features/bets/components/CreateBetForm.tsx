'use client';

import { Form } from '@/components/feature/Form';
import { useCreateBetForm } from '../hooks/useCreateBetForm';
import { InputGroup } from '@/components/ui/InputGroup';
import { FormHeading } from '@/components/ui/FormHeading';
import { Button } from '@/components/feature/Button';
import { Add } from '@mui/icons-material';
import { useBatch } from '@/hooks/useBatch';
import { Chip } from '@/components/ui/Chip';
import { useRef } from 'react';

export function CreateBetForm() {
  const { bet, updateBet, status, onSubmit } = useCreateBetForm();
  const { batch: options, add: addOption, del: deleteOpt } = useBatch();
  const ref = useRef(null);
  return (
    <Form onSubmit={onSubmit}>
      <FormHeading>Create Bet</FormHeading>
      <InputGroup>
        <label>Title</label>
        <input
          name='title'
          placeholder='Type a title...'
          max={32}
          min={1}
          value={bet.title}
          onChange={updateBet}
          required
        />
      </InputGroup>
      <InputGroup>
        <label>Minimum bid</label>
        <input
          min={1}
          type='number'
          name='data.min_bid'
          placeholder='Type a minimum bid...'
          value={bet.data.min_bid}
          onChange={updateBet}
          required
        />
      </InputGroup>
      <InputGroup>
        <label>Expiry date</label>
        <input
          type='date'
          name='expires_at'
          value={bet.expires_at}
          onChange={updateBet}
        />
      </InputGroup>
      <div className='flex gap-2 w-full'>
        {options.map(opt => (
          <Chip onDelete={() => deleteOpt(opt)}>{opt}</Chip>
        ))}
      </div>
      <div className='flex gap-2 w-full'>
        <input
          ref={ref}
          className='w-full'
        />
        <Button
          variant='contained'
          type='button'
          onClick={() => addOption(ref.current?.value)}>
          <Add />
        </Button>
      </div>
      <div className='w-full'>
        <Button
          variant='contained'
          color='accent'
          type='submit'
          loading={status === 'loading'}
          disabled={status === 'loading' || status === 'done'}
          fullWidth>
          Create
        </Button>
      </div>
    </Form>
  );
}
