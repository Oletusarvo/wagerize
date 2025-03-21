'use client';

import { useClassName } from '@/hooks/useClassName';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { ReactNode, useState } from 'react';

type InputProps = React.ComponentProps<'input'> & {
  icon?: ReactNode;
};

export function Input({ icon, ...props }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputClassName = useClassName([
    icon ? 'pl-12 pr-4' : 'px-4',
    'bg-none outline-none w-full absolute top-0 left-0 h-full',
  ]);

  const toggleShowPassword = e => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className='flex relative items-center text-gray-700 px-4 py-2 gap-1 rounded-inputs overflow-hidden w-full bg-white border border-border'>
      <span className='text-gray-400 absoute left-2 z-10'>{icon}</span>
      <input
        {...props}
        type={props.type === 'password' && showPassword ? 'text' : props.type}
        className={inputClassName}
      />
      {props.type === 'password' ? (
        <span
          className='text-gray-400 cursor-pointer absolute right-2'
          onClick={toggleShowPassword}>
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </span>
      ) : null}
    </div>
  );
}
