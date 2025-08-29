import { Input } from '@/components/ui/input-temp';
import { InputGroup } from '@/components/ui/input-group';
import { ArrowDown, ArrowDownCircle } from 'lucide-react';
import { useCreateBetFormContext } from '../../create-bet-form';
import { WithZodParseResult } from '@/components/feature/with-zod-parse-result';
import { betSchema } from '@/features/bets/schemas/bet-schema';
import { BetError } from '@/features/bets/error/bet-error';
import { ErrorHelper } from '@/components/ui/input-helper';

const minBidSchema = betSchema.shape.min_bid;

export function MinBidInput() {
  const { payload, updatePayload, parseResult, updateParseResult } = useCreateBetFormContext();
  return (
    <InputGroup>
      <Input
        value={payload.get('min_bid')?.toString()}
        onChange={e => {
          updatePayload(e);
          updateParseResult(e.target.name, minBidSchema.safeParse(e.target.valueAsNumber));
        }}
        icon={<ArrowDownCircle />}
        min={1}
        type='number'
        name='min_bid'
        placeholder='Minimum Bid'
        required
      />
      <StatusNotice status={parseResult.min_bid} />
    </InputGroup>
  );
}

function StatusNotice({ status }) {
  return status ? <ErrorHelper>Must be a number!</ErrorHelper> : null;
}
