'use client';
import { Button } from '@/components/feature/Button';
import { ToggleProvider } from '@/components/feature/ToggleProvider';
import { Container } from '@/components/ui/Container';
import { FormHeading } from '@/components/ui/FormHeading';
import { Modal } from '@/components/ui/Modal';
import { useState } from 'react';
import { PlaceBidForm } from './PlaceBidForm';

export function PlaceBidButton({ bet, outcomes, disabled }) {
  return (
    <ToggleProvider>
      <ToggleProvider.Trigger>
        <Button
          fullWidth
          disabled={disabled}
          type='button'
          variant='contained'
          color='accent'>
          Place Bid
        </Button>
      </ToggleProvider.Trigger>

      <ToggleProvider.Target>
        <Modal title='Select outcome'>
          <PlaceBidForm
            bet={bet}
            outcomes={outcomes}
          />
        </Modal>
      </ToggleProvider.Target>
    </ToggleProvider>
  );
}
