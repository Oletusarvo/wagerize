'use client';

import { DataPoint } from '@/components/DataPoint';
import { Container } from '@/components/ui/Container';
import { ArrowDown, ArrowDownCircle, ArrowUp, Check, Dice5, Wallet } from 'lucide-react';
import Link from 'next/link';
import { useBetContext } from '../providers/BetProvider';
import { useBidContext } from '@/features/bids/providers/BidProvider';
import { useRouter } from 'next/navigation';
import { createClassName } from '@/utils/createClassName';
import { PlacedBidIndicator } from '@/features/bids/components/PlacedBidIndicator';

export function BetListing() {
  const { bet } = useBetContext();
  const { bid, mustCall } = useBidContext();
  const router = useRouter();
  const bidStatus: BidBadgeProps['status'] =
    bet.status === 'frozen' ? 'frozen' : bid !== undefined ? 'participated' : 'open';

  return (
    <Container>
      <div
        onClick={() => router.push(`/app/bets/${bet.id}`)}
        className='flex flex-col gap-8 w-full text-white'>
        <div className='flex flex-col gap-1'>
          <div className='flex w-full justify-between items-start'>
            <h3 className='font-semibold max-w-[70%] overflow-hidden overflow-ellipsis text-nowrap'>
              {bet.title}
            </h3>
            <div className='flex items-center gap-4'>
              <small>{new Date(bet.created_at).toLocaleDateString('fi')}</small>
              <BidBadge status={bidStatus} />
            </div>
          </div>

          <p className='text-white'>{bet.description || 'No description.'}</p>
        </div>

        <div className='flex w-full justify-between'>
          <div className='flex gap-4 p-2 bg-[#fff1] rounded-[100px] px-4'>
            <DataPoint
              IconComponent={ArrowDown}
              content={bet.min_bid}
            />

            {bet.min_raise && (
              <DataPoint
                IconComponent={ArrowUp}
                content={<>{bet.min_raise}</>}
              />
            )}

            <DataPoint
              IconComponent={props => (
                <Dice5
                  {...props}
                  rotate='45deg'
                />
              )}
              content={bet.pool}
            />
          </div>
          {bid && <PlacedBidIndicator />}
        </div>
      </div>
    </Container>
  );
}

type BidBadgeProps = {
  status: 'participated' | 'frozen' | 'open';
};

const BidBadge = ({ status }: BidBadgeProps) => {
  const baseClassName = 'w-2 h-2 aspect-square rounded-full absolute';

  const className = createClassName(
    status === 'frozen' ? 'bg-blue-600' : status === 'participated' ? 'bg-red-600' : 'bg-green-600',
    baseClassName
  );

  const glowClassName = createClassName(
    baseClassName,
    'blur-xs',
    status === 'frozen' ? 'bg-blue-200' : status === 'participated' ? 'bg-red-200' : 'bg-green-200'
  );

  return (
    <div className='relative flex items-center justify-center'>
      <div className={glowClassName} />
      <div className={className} />
    </div>
  );
};
