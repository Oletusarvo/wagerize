import { Input } from '@/components/ui/input';
import { InputGroup } from '@/components/ui/input-group';
import { useCreateBetForm } from '@/features/bets/hooks/use-create-bet-form';
import { Check, Plus } from 'lucide-react';
import { useRef } from 'react';
import { useCreateBetFormContext } from '../../create-bet-form';
import { Chip } from '@/components/ui/chip';
import { Icon } from '@/components/ui/icon';

export function OutcomesInput() {
  const ref = useRef(null);
  const { addOption, deleteOpt, options } = useCreateBetFormContext();

  return (
    <InputGroup>
      <div className='flex gap-2 w-full items-center relative'>
        <Input
          icon={<Check />}
          ref={ref}
          className='w-full'
          placeholder='Type the label for an outcome...'
          type='text'
          minLength={1}
          maxLength={32}
        />
        <button
          className='button --round --ghost text-white absolute right-0'
          type='button'
          onClick={() => {
            const optInput = ref.current;
            if (optInput && optInput.value.length > 0) {
              addOption(optInput.value);
            }

            if (ref.current) {
              ref.current.value = '';
            }
          }}>
          <Icon
            Component={Plus}
            size='16px'
          />
        </button>
      </div>
      {options.length > 0 && (
        <div className='flex gap-2 w-full flex-wrap'>
          {options.map((opt, i) => (
            <Chip
              key={`bet-opt-${i}`}
              onDelete={() => {
                deleteOpt(opt);
              }}>
              {opt}
            </Chip>
          ))}
        </div>
      )}
    </InputGroup>
  );
}
