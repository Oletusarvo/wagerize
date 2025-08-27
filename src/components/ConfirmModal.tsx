'use client';

import { Button, LoaderButton } from '@/components/feature/Button';
import { Modal } from '@/components/ui/Modal';
import { ToggleProvider } from '@/providers/ToggleProvider';
import React, { useRef } from 'react';
import { useState } from 'react';

type ConfirmModalProps = React.PropsWithChildren & {
  title: string;
  onConfirm: (e) => Promise<void> | void;
  as?: 'div' | 'form';
};

export function ConfirmModal({
  children,
  title,
  onConfirm,
  as = 'div',
  ...props
}: ConfirmModalProps) {
  const [isPending, setIsPending] = useState(false);
  const ref = useRef<HTMLDivElement | HTMLFormElement>(null);

  const content = React.createElement(as, {
    ref,
    children: (
      <>
        {children}
        <div className='flex gap-2 w-full'>
          <ToggleProvider.Trigger>
            <Button
              variant='outlined'
              color='secondary'
              fullWidth>
              Cancel
            </Button>
          </ToggleProvider.Trigger>

          <ToggleProvider.Trigger
            action={async () => {
              setIsPending(true);
              try {
                await onConfirm(ref.current);
              } catch (err) {
                console.log(err.message);
              } finally {
                setIsPending(false);
              }
            }}>
            <LoaderButton
              type='button'
              fullWidth
              loading={isPending}
              disabled={isPending}>
              OK
            </LoaderButton>
          </ToggleProvider.Trigger>
        </div>
      </>
    ),
    className: 'flex flex-col gap-4',
  });

  return (
    <Modal
      {...props}
      title={title}>
      {content}
    </Modal>
  );
}

ConfirmModal.Message = function ({ children }: React.PropsWithChildren) {
  return <p>{children}</p>;
};
