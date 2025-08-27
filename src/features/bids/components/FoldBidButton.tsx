import { Button } from '@/components/feature/Button';
import { useBidContext } from '../providers/BidProvider';
import { ToggleProvider } from '@/providers/ToggleProvider';
import { ConfirmModal } from '../../../components/ConfirmModal';

export function FoldBidButton() {
  const { mustCall, fold } = useBidContext();

  return (
    mustCall && (
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
    )
  );
}
