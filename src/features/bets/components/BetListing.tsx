import { DataPoint } from '@/components/DataPoint';
import { Chip } from '@/components/ui/Chip';
import { Container } from '@/components/ui/Container';
import { ArrowDownward, Check, Wallet } from '@mui/icons-material';
import Link from 'next/link';

export function BetListing({ bet }) {
  const hasParticipated = bet.bid !== undefined;

  return (
    <Container
      as={Link}
      href={`/auth/bets/${bet.id}`}
      key={`bet-${bet.id}`}>
      <div className='flex w-full justify-between items-center'>
        <h1 className='font-semibold'>{bet.data.title}</h1>
        <BidBadge hasParticipated={hasParticipated} />
      </div>

      <p className='text-gray-600'>{bet.data.description || 'No description.'}</p>
      <div className='flex w-full justify-between'>
        <div className='flex gap-4'>
          <DataPoint
            IconComponent={ArrowDownward}
            content={<>{bet.data.min_bid}D</>}
          />

          <DataPoint
            IconComponent={Wallet}
            content={<>{bet.pool}D</>}
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

const BidBadge = ({ hasParticipated }) => {
  const className = [
    'w-2 h-2 aspect-square rounded-full',
    hasParticipated ? 'bg-red-600' : 'bg-green-600',
  ]
    .join(' ')
    .trim();
  return <span className={className} />;
};
