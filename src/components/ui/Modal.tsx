'use client';

import { Clear } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useRef } from 'react';
import { ToggleProvider } from '../feature/ToggleProvider';

export function Modal({ children, title }) {
  const ref = useRef(null);

  return (
    <ModalContainer>
      <div
        className='flex flex-col p-4 rounded-md relative w-full items-center justify-center bg-white'
        ref={ref}>
        <div className='flex w-full items-center justify-between'>
          <h1>{title}</h1>
          <ToggleProvider.Trigger>
            <IconButton>
              <Clear />
            </IconButton>
          </ToggleProvider.Trigger>
        </div>
        {children}
      </div>
    </ModalContainer>
  );
}

function ModalContainer({ children }) {
  return (
    <div className='absolute top-0 left-0 z-30 backdrop-blur-md flex w-full h-full items-center justify-center'>
      {children}
    </div>
  );
}
