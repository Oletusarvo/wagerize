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
        <h1 className='font-semibold'>{bet.data.title}</h1>
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

const Icon = ({ Component, ...props }) => (
  <Component
    {...props}
    sx={{ color: 'var(--color-gray-300)' }}
  />
);

type BidBadgeProps = {
  status: 'participated' | 'frozen' | 'open';
};

const BidBadge = ({ status }: BidBadgeProps) => {
  console.log(status);
  const className = [
    status === 'frozen' ? 'bg-blue-600' : status === 'participated' ? 'bg-red-600' : 'bg-green-600',
    'w-2 h-2 aspect-square rounded-full',
  ]
    .join(' ')
    .trim();
  console.log(className);
  return <span className={className} />;
};
