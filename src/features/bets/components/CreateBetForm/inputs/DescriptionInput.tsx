import { InputGroup } from '@/components/ui/InputGroup';
import { useCreateBetFormContext } from '../../CreateBetForm';

export function DescriptionInput() {
  const { payload, updatePayload } = useCreateBetFormContext();
  return (
    <div className='flex w-full h-full'>
      <textarea
        value={payload.get('description')?.toString()}
        onChange={updatePayload}
        spellCheck={false}
        autoComplete='false'
        name='description'
        placeholder='Description'
        className='flex-1'
      />
    </div>
  );
}
