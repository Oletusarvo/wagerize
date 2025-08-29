'use client';

import { DataPoint } from '@/components/data-point';
import { Icon } from '@/components/ui/icon';

import toast from 'react-hot-toast';
import { useBetContext } from '../providers/bet-provider';
import {
  ArrowDown,
  ArrowDownCircle,
  ArrowLeft,
  ArrowUp,
  ArrowUpCircle,
  ArrowUpToLine,
  Clock,
  Share,
} from 'lucide-react';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { capitalize } from '@/utils/capitalize';
import Link from 'next/link';
import { Button } from '@/components/feature/button';
import { BetStatusBadge } from './bet-status-badge';
import { useRouter } from 'next/navigation';
import { BetAuthorBadge } from './bet-author-badge';

export function BetHeader() {
  const { bet } = useBetContext();
  const timeLeft = bet.expires_at ? new Date(bet.expires_at).getTime() - Date.now() : null;
  const router = useRouter();
  const copyLinkToClipboard = useCopyToClipboard(window.location.href, () =>
    toast.success('Link copied!')
  );

  return (
    <div
      id='bet-page-header'
      className='flex flex-col px-default py-4 w-full bg-container-background text-white gap-8'>
      <div className='flex gap-2 flex-col items-start'>
        <div className='flex w-full justify-between items-center'>
          <div className='flex gap-2 items-center'>
            <button
              className='outlined --secondary rounded-full text-sm'
              onClick={() => router.push('/app/feed')}>
              <ArrowLeft />
            </button>

            <BetTitle />
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <BetAuthorBadge />
          <BetStatusBadge />
        </div>

        <BetDescription />
      </div>

      <div className='flex w-full justify-between items-center text-white'>
        <div className='flex gap-2 p-2 rounded-[100px] bg-[#fff2]'>
          <DataPoint
            IconComponent={ArrowDownCircle}
            color='white'
            content={<>{bet.min_bid}</>}
          />
          {bet.min_raise && (
            <DataPoint
              IconComponent={ArrowUpCircle}
              color='white'
              content={<>{bet.min_raise}</>}
            />
          )}
          {bet.max_raise && (
            <DataPoint
              IconComponent={ArrowUpToLine}
              color='white'
              content={<>{bet.max_raise}</>}
            />
          )}
        </div>
        <DataPoint
          IconComponent={Clock}
          color='white'
          content={
            timeLeft
              ? timeLeft <= 0
                ? 'Expired.'
                : Math.ceil(timeLeft / 60 / 60 / 24 / 1000) + ' Day(s) left.'
              : 'No expiry.'
          }
        />
      </div>
    </div>
  );
}

function BetTitle() {
  const { bet } = useBetContext();
  return <h2 className='text-lg font-semibold'>{bet.title || 'No Title'}</h2>;
}

function BetDescription() {
  const { bet } = useBetContext();
  return <p className='text-sm'>{bet.description || 'No Description.'}</p>;
}
