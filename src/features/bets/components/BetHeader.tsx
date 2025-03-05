import { DataPoint } from '@/components/DataPoint';
import ArrowDownward from '@mui/icons-material/ArrowDownward';

export function BetHeader({ bet }) {
  return (
    <div className='flex w-full justify-between'>
      <DataPoint
        IconComponent={ArrowDownward}
        content={<>{bet.data.min_bid}D</>}
      />
    </div>
  );
}
