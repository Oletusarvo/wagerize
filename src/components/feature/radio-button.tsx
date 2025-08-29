import { useRef, useState } from 'react';
import { Container } from '../ui/container';

export function RadioButton({ onClick, value, selectedValue, label, name }) {
  const checked = selectedValue === value;
  const inputRef = useRef<HTMLInputElement>(null);
  const changeValue = () => {
    onClick(value !== selectedValue ? value : undefined);
  };

  return (
    <div
      onClick={e => inputRef.current?.click()}
      className='flex p-4 rounded-md justify-between cursor-pointer text-white'
      style={{
        backgroundColor: checked ? 'hsl(from var(--color-accent) h s l / 0.4)' : '#fff2',
      }}>
      <div className='flex w-full justify-between items-center'>
        <h1 className='w-full'>{label}</h1>
        <input
          ref={inputRef}
          type='radio'
          name={name}
          checked={checked}
          onChange={e => changeValue()}
        />
      </div>
    </div>
  );
}
