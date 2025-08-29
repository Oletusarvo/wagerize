import { Input } from '@/components/ui/input-temp';
import { InputGroup } from '@/components/ui/input-group';
import { ArrowUp, ArrowUpToLine } from 'lucide-react';
import { useCreateBetFormContext } from '../../create-bet-form';
import { useState } from 'react';
import { WithZodParseResult } from '@/components/feature/with-zod-parse-result';
import { betSchema } from '@/features/bets/schemas/bet-schema';

const maxRaiseSchema = betSchema.shape.max_raise;
export function MaxRaiseInput() {
  const { payload, updatePayload, updateParseResult, parseResult } = useCreateBetFormContext();
  const minRaise = payload.get('min_raise')?.toString();

  return (
    <InputGroup>
      <Input
        value={payload.get('max_raise')?.toString()}
        onChange={e => {
          updatePayload(e);
          updateParseResult(e.target.name, maxRaiseSchema.safeParse(e.target.valueAsNumber));
        }}
        icon={<ArrowUpToLine />}
        className='w-full'
        min={(minRaise && parseInt(minRaise) + 1) || 1}
        type='number'
        name='max_raise'
        placeholder='Max Raise'
      />
      <StatusNotice status={parseResult.max_raise} />
    </InputGroup>
  );
}

function StatusNotice({ status }) {
  return null;
}
