import pkg from 'betting_app/package.json';
import { Dice5 } from 'lucide-react';

export function Logo() {
  return (
    <div className='flex gap-2 items-center'>
      <Dice5 className='rotate-45' />
      <h1 className='text-lg font-semibold'>{pkg.name}</h1>
    </div>
  );
}
