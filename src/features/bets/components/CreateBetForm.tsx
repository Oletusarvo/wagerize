'use client';

import { Form } from '@/components/feature/Form';
import { useCreateBetForm } from '../hooks/useCreateBetForm';
import { InputGroup } from '@/components/ui/InputGroup';
import { FormHeading } from '@/components/ui/FormHeading';
import { Button } from '@/components/feature/Button';
import { Add, ArrowDownward, ArrowUpward, CalendarMonth, Check, Title } from '@mui/icons-material';

import { useBatch } from '@/hooks/useBatch';
import { Chip } from '@/components/ui/Chip';
import { useMemo, useRef } from 'react';
import { IconButton } from '@mui/material';
import { Icon } from '@/components/ui/Icon';
import { Drawer } from '@/components/feature/Drawer';
import { Input } from '@/components/ui/Input';
import { Helper } from '@/components/ui/InputHelper';

export function CreateBetForm() {
  const { bet, updateBet, status, onSubmit, options, addOption, deleteOpt } = useCreateBetForm();
  const ref = useRef(null);

  const minimumDate = useMemo(() => {
    const min = new Date();
    min.setDate(min.getDate() + 1);
    return min;
  }, []);

  const submitDisabled = useMemo(() => {
    return (
      status === 'loading' ||
      status === 'done' ||
      !bet.data.title ||
      !bet.data.min_bid ||
      options.length == 0
    );
  }, [status, bet.data, options]);

  return (
    <Form onSubmit={onSubmit}>
      <FormHeading>Create Challenge</FormHeading>
      <InputGroup>
        <label>Title</label>
        <Input
          icon={<Title />}
          name='data.title'
          placeholder='Type a title...'
          max={32}
          min={1}
          value={bet.data.title}
          onChange={updateBet}
          required
        />
      </InputGroup>

      <InputGroup>
        <label>Description</label>
        <textarea
          spellCheck={false}
          name='data.description'
          placeholder='Write a description...'
          value={bet.data.description}
          onChange={updateBet}
        />
      </InputGroup>
      <InputGroup>
        <label>Minimum bid</label>
        <Input
          icon={<ArrowDownward />}
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
        <label>Minimum Raise</label>
        <Input
          icon={<ArrowUpward />}
          name='data.min_raise'
          type='number'
          min={1}
          step={1}
          placeholder='Type a minimum raise...'
          value={bet.data.min_raise}
          onChange={updateBet}
        />
        <Helper>Leave empty for no raising.</Helper>
      </InputGroup>

      <InputGroup>
        <label>Expiry date</label>
        <Input
          icon={<CalendarMonth />}
          min={minimumDate.toISOString().split('T').at(0)}
          className='w-full'
          type='date'
          name='expires_at'
          value={bet.expires_at !== '' ? bet.expires_at : undefined}
          onChange={e => {
            updateBet(e);
          }}
        />
      </InputGroup>

      <InputGroup>
        <label>Outcomes</label>
        <div className='flex gap-2 w-full'>
          <Input
            icon={<Check />}
            ref={ref}
            className='w-full'
            placeholder='Type the label for an outcome...'
            type='text'
            minLength={1}
            maxLength={32}
          />
          <IconButton
            type='button'
            onClick={() => {
              const optInput = ref.current;
              if (optInput && optInput.value.length > 0) {
                addOption(optInput.value);
              }

              if (ref.current) {
                ref.current.value = '';
              }
            }}>
            <Icon
              Component={Add}
              size='large'
            />
          </IconButton>
        </div>
        {options.length > 0 && (
          <div className='flex gap-2 w-full flex-wrap'>
            {options.map((opt, i) => (
              <Chip
                key={`bet-opt-${i}`}
                onDelete={() => {
                  deleteOpt(opt);
                }}>
                {opt}
              </Chip>
            ))}
          </div>
        )}
      </InputGroup>

      <div className='w-full'>
        <Button
          variant='contained'
          color='accent'
          type='submit'
          loading={status === 'loading'}
          disabled={submitDisabled}
          fullWidth>
          Create
        </Button>
      </div>
    </Form>
  );
}
