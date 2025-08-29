import { Button } from '@/components/feature/button-temp';
import { useBidContext } from '../providers/bid-provider';
import { ToggleProvider } from '@/providers/toggle-provider';
import { ConfirmModal } from '../../../components/confirm-modal';

export function FoldBidButton() {
  const { fold } = useBidContext();

  return (
    <ToggleProvider>
      <ToggleProvider.Trigger>
        <Button
          variant='outlined'
          color='secondary'
          fullWidth>
          Fold
        </Button>
      </ToggleProvider.Trigger>
      <ToggleProvider.Target>
        <ConfirmModal
          title='Folding Bid'
          onConfirm={async () => await fold()}>
          You are about to fold your bid. Doing so will block your participation in the bet, and
          prevent you from winning the pool.
          <br />
          Are you sure you wish to continue?
        </ConfirmModal>
      </ToggleProvider.Target>
    </ToggleProvider>
  );
}
