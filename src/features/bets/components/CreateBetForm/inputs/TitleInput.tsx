import { Input } from '@/components/ui/Input';
import { InputGroup } from '@/components/ui/InputGroup';
import { Heading } from 'lucide-react';
import { useCreateBetFormContext } from '../../CreateBetForm';

export function TitleInput() {
  const { payload, updatePayload } = useCreateBetFormContext();
  return (
    <InputGroup>
      <Input
        value={payload.get('title')?.toString()}
        onChange={updatePayload}
        icon={<Heading />}
        name='title'
        placeholder='Title'
        max={32}
        min={1}
        required
      />
    </InputGroup>
  );
}
