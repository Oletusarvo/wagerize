import { Input } from '@/components/ui/Input';
import { InputGroup } from '@/components/ui/InputGroup';
import { Calendar } from 'lucide-react';
import { useMemo } from 'react';
import { useCreateBetFormContext } from '../../CreateBetForm';

export function ExpiryDateInput() {
  const { payload, updatePayload } = useCreateBetFormContext();
  const minimumDate = useMemo(() => {
    const min = new Date();
    min.setDate(min.getDate() + 1);
    return min;
  }, []);

  return (
    <InputGroup>
      <Input
        placeholder='Expires At'
        value={payload.get('expires_at')?.toString()}
        onChange={updatePayload}
        icon={<Calendar />}
        min={minimumDate.toISOString().split('T').at(0)}
        className='w-full'
        type='date'
        name='expires_at'
      />
    </InputGroup>
  );
}
