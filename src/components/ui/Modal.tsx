'use client';

import { useRef } from 'react';
import { ToggleProvider } from '../../providers/ToggleProvider';
import { X } from 'lucide-react';
import { Button } from '../feature/Button';
import { useClassName } from '@/hooks/useClassName';

export function Modal({ children, onClose = null, fullHeight = false, title }) {
  const ref = useRef(null);

  const closeButton = (
    <Button
      onClick={onClose}
      variant='ghost'
      round>
      <X color='white' />
    </Button>
  );

  const bodyClassName = useClassName(
    'flex flex-col p-4 rounded-md relative w-full',
    fullHeight ? 'h-full' : ''
  );
  return (
    <ModalContainer>
      <div
        style={{
          backgroundColor: 'hsl(from var(--color-background-light) h s l / 0.7)',
        }}
        className={bodyClassName}
        ref={ref}>
        <div className='flex w-full items-center justify-between py-2'>
          <h1 className='font-semibold text-accent'>{title}</h1>
          {!onClose ? <ToggleProvider.Trigger>{closeButton}</ToggleProvider.Trigger> : closeButton}
        </div>
        {children}
      </div>
    </ModalContainer>
  );
}

function ModalContainer({ children }) {
  return (
    <div className='absolute top-0 left-0 z-30 backdrop-blur-md flex w-full h-full items-center justify-center p-2'>
      {children}
    </div>
  );
}
