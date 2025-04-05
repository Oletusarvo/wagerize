import { DataPoint } from '@/components/DataPoint';
import { Chip } from '@/components/ui/Chip';
import { Container } from '@/components/ui/Container';
import { CurrencyIcon } from '@/components/ui/CurrencyIcon';
import { ArrowDownward, Check, Wallet } from '@mui/icons-material';
import Link from 'next/link';

export function BetListing({ bet }) {
  const bidStatus: BidBadgeProps['status'] = bet.data.is_frozen
    ? 'frozen'
    : bet.bid !== undefined
    ? 'participated'
    : 'open';

  return (
    <Container
      as={Link}
      href={`/auth/bets/${bet.id}`}
      key={`bet-${bet.id}`}>
      <div className='flex w-full justify-between items-baseline'>
        <h3 className='font-semibold'>{bet.data.title}</h3>
        <BidBadge status={bidStatus} />
      </div>

      <p className='text-gray-600'>{bet.data.description || 'No description.'}</p>
      <div className='flex w-full justify-between'>
        <div className='flex gap-4'>
          <DataPoint
            IconComponent={ArrowDownward}
            content={bet.data.min_bid}
          />

          <DataPoint
            IconComponent={Wallet}
            content={bet.pool}
          />
        </div>
        {bet.bid !== undefined && (
          <span className='flex items-center gap-1'>
            <Check sx={{ fontSize: '1rem' }} />
            {bet.bid.outcome}
          </span>
        )}
      </div>
    </Container>
  );
}

type BidBadgeProps = {
  status: 'participated' | 'frozen' | 'open';
};

const BidBadge = ({ status }: BidBadgeProps) => {
  const className = [
    status === 'frozen' ? 'bg-blue-600' : status === 'participated' ? 'bg-red-600' : 'bg-green-600',
    'w-2 h-2 aspect-square rounded-full',
  ]
    .join(' ')
    .trim();
  return <span className={className} />;
};
