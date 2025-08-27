import { Input } from '@/components/ui/Input';
import { InputGroup } from '@/components/ui/InputGroup';
import { ArrowDown } from 'lucide-react';
import { useCreateBetFormContext } from '../../CreateBetForm';

export function MinBidInput() {
  const { payload, updatePayload } = useCreateBetFormContext();
  return (
    <InputGroup>
      <Input
        value={payload.get('min_bid')?.toString()}
        onChange={updatePayload}
        icon={<ArrowDown />}
        min={1}
        type='number'
        name='min_bid'
        placeholder='Minimum Bid'
        required
      />
    </InputGroup>
  );
}
