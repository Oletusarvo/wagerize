import { Input } from '@/components/ui/input';
import { InputGroup } from '@/components/ui/input-group';
import { Heading } from 'lucide-react';
import { useCreateBetFormContext } from '../../create-bet-form';
import { ErrorHelper } from '@/components/ui/input-helper';
import { BetError } from '@/features/bets/error/bet-error';
import { betSchema } from '@/features/bets/schemas/bet-schema';
import { getParseResultErrorMessage } from '@/utils/get-parse-result-error-message';

const titleSchema = betSchema.shape.title;
export function TitleInput() {
  const { payload, updatePayload, parseResult, updateParseResult } = useCreateBetFormContext();

  return (
    <InputGroup>
      <Input
        value={payload.get('title')?.toString()}
        onChange={e => {
          updatePayload(e);
          updateParseResult(e.target.name, titleSchema.safeParse(e.target.value));
        }}
        type='text'
        icon={<Heading />}
        name='title'
        placeholder='Title'
        max={32}
        min={1}
        required
        autoComplete='false'
      />
      <StatusNotice status={parseResult.title} />
    </InputGroup>
  );
}

export function StatusNotice({ status }) {
  return status === BetError.TITLE_TOO_LONG ? (
    <ErrorHelper>The title is too long!</ErrorHelper>
  ) : status === BetError.TITLE_TOO_SHORT ? (
    <ErrorHelper>The title is too short!</ErrorHelper>
  ) : null;
}
