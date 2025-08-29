import { Input } from '@/components/ui/input';
import { InputGroup } from '@/components/ui/input-group';
import { ArrowUp, ArrowUpCircle, Calendar } from 'lucide-react';
import { useCreateBetFormContext } from '../../create-bet-form';
import { betSchema } from '@/features/bets/schemas/bet-schema';
import { useState } from 'react';
import { ErrorHelper } from '@/components/ui/input-helper';
import { BetError } from '@/features/bets/error/bet-error';

const minRaiseSchema = betSchema.shape.min_raise;

export function MinRaiseInput() {
  const { payload, updatePayload, updateParseResult, parseResult } = useCreateBetFormContext();
  const maxRaise = payload.get('max_raise')?.toString();
  console.log(maxRaise);

  return (
    <InputGroup>
      <Input
        value={payload.get('min_raise')?.toString()}
        onChange={e => {
          updatePayload(e);
          updateParseResult(e.target.name, minRaiseSchema.safeParse(e.target.valueAsNumber));
        }}
        icon={<ArrowUpCircle />}
        className='w-full'
        type='number'
        max={maxRaise && parseInt(maxRaise) - 1}
        min={1}
        placeholder='Minimum Raise'
        name='min_raise'
      />
      <StatusNotice status={parseResult.min_raise} />
    </InputGroup>
  );
}

function StatusNotice({ status }) {
  return status === BetError.MIN_RAISE_EXCESS ? (
    <ErrorHelper>Min raise cannot be larger than max raise!</ErrorHelper>
  ) : null;
}
