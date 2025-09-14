'use client';

import React, { useRef } from 'react';
import { ToggleProvider } from '../../providers/toggle-provider';
import { X } from 'lucide-react';
import { Button } from '../feature/button-temp';
import { useClassName } from '@/hooks/use-class-name';

export function Modal({ children, onClose = null, fullHeight = false }) {
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

  const childArray = React.Children.toArray(children);

  const title = childArray.find((c: any) => c.type == Modal.Title);
  const body = childArray.find((c: any) => c.type == Modal.Body);
  console.log(childArray.length);
  return (
    <ModalContainer>
      <div
        style={{
          backgroundColor: 'hsl(from var(--color-background-light) h s l / 0.7)',
        }}
        className={bodyClassName}
        ref={ref}>
        <div className='flex w-full items-center justify-between py-2'>
          {title}
          {!onClose ? <ToggleProvider.Trigger>{closeButton}</ToggleProvider.Trigger> : closeButton}
        </div>
        {body}
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

Modal.Title = function ({ children }: React.PropsWithChildren) {
  return <h1 className='font-semibold text-accent'>{children}</h1>;
};

Modal.Body = function ({ children }: React.PropsWithChildren) {
  return children;
};
