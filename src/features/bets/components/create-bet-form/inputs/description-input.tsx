import { useCreateBetFormContext } from '../../create-bet-form';
import { BetError } from '@/features/bets/error/bet-error';
import { ErrorHelper } from '@/components/ui/input-helper';
import { betSchema } from '@/features/bets/schemas/bet-schema';

const descriptionSchema = betSchema.shape.description;
export function DescriptionInput() {
  const { payload, updatePayload, parseResult, updateParseResult } = useCreateBetFormContext();

  return (
    <div className='flex w-full h-full flex-col gap-2'>
      <textarea
        onChange={e => {
          updatePayload(e);
          updateParseResult(e.target.name, descriptionSchema.safeParse(e.target.value));
        }}
        value={payload.get('description')?.toString()}
        spellCheck={false}
        autoComplete='false'
        name='description'
        placeholder='Description'
        className='flex-1'
      />
      <StatusNotice status={parseResult.description} />
    </div>
  );
}

function StatusNotice({ status }) {
  return status === BetError.DESCRIPTION_TOO_LONG ? (
    <ErrorHelper>The description is too long!</ErrorHelper>
  ) : null;
}
