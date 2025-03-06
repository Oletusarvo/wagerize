import { DataPoint } from '@/components/DataPoint';
import { LockClock, TimeToLeave } from '@mui/icons-material';
import ArrowDownward from '@mui/icons-material/ArrowDownward';

export function BetHeader({ bet }) {
  const timeLeft = bet.expires_at ? bet.expires_at.getTime() - Date.now() : null;
  return (
    <div className='flex w-full justify-between'>
      <DataPoint
        IconComponent={ArrowDownward}
        content={<>{bet.data.min_bid}D</>}
      />

      <DataPoint
        IconComponent={LockClock}
        content={
          timeLeft
            ? timeLeft <= 0
              ? 'Expired.'
              : Math.ceil(timeLeft / 60 / 60 / 24 / 1000) + ' Day(s) left.'
            : 'No expiry.'
        }
      />
    </div>
  );
}
