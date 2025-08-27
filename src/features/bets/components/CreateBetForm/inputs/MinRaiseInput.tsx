import { Input } from '@/components/ui/Input';
import { InputGroup } from '@/components/ui/InputGroup';
import { ArrowUp, Calendar } from 'lucide-react';
import { useCreateBetFormContext } from '../../CreateBetForm';

export function MinRaiseInput() {
  const { payload, updatePayload } = useCreateBetFormContext();
  return (
    <InputGroup>
      <Input
        value={payload.get('min_raise')?.toString()}
        onChange={updatePayload}
        icon={<ArrowUp />}
        className='w-full'
        type='number'
        placeholder='Minimum Raise'
        name='min_raise'
      />
    </InputGroup>
  );
}
