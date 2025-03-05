import { DataPoint } from '@/components/DataPoint';
import { LockClock, TimeToLeave } from '@mui/icons-material';
import ArrowDownward from '@mui/icons-material/ArrowDownward';

export function BetHeader({ bet }) {
  return (
    <div className='flex w-full justify-between'>
      <DataPoint
        IconComponent={ArrowDownward}
        content={<>{bet.data.min_bid}D</>}
      />

      <DataPoint
        IconComponent={LockClock}
        content={bet.created_at ? new Date(bet.expires_at).toLocaleDateString('fi') : 'None'}
      />
    </div>
  );
}
