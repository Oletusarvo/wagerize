import { Input } from '@/components/ui/Input';
import { InputGroup } from '@/components/ui/InputGroup';
import { ArrowUp } from 'lucide-react';
import { useCreateBetFormContext } from '../../CreateBetForm';

export function MaxRaiseInput() {
  const { payload, updatePayload } = useCreateBetFormContext();
  return (
    <InputGroup>
      <Input
        value={payload.get('max_raise')?.toString()}
        onChange={updatePayload}
        icon={<ArrowUp />}
        className='w-full'
        type='number'
        name='max_raise'
        placeholder='Max Raise'
      />
    </InputGroup>
  );
}
