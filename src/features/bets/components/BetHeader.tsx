'use client';

import { DataPoint } from '@/components/DataPoint';
import { Icon } from '@/components/ui/Icon';

import toast from 'react-hot-toast';
import { useBetContext } from '../providers/BetProvider';
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
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { capitalize } from '@/utils/capitalize';
import Link from 'next/link';
import { Button } from '@/components/feature/Button';

export function BetHeader() {
  const { bet } = useBetContext();
  const timeLeft = bet.expires_at ? new Date(bet.expires_at).getTime() - Date.now() : null;

  const copyLinkToClipboard = useCopyToClipboard(window.location.href, () =>
    toast.success('Link copied!')
  );

  return (
    <div
      id='bet-page-header'
      className='flex flex-col px-default py-4 w-full bg-container-background text-white gap-8'>
      <div className='flex gap-4 flex-col'>
        <div className='flex w-full justify-between items-center'>
          <div className='flex gap-2 items-center'>
            <Link href='/app/feed'>
              <button className='outlined --secondary rounded-full text-sm'>
                <ArrowLeft />
              </button>
            </Link>
            <BetTitle />
          </div>

          <div
            className='rounded-[100px] flex py-1 px-2 text-xs'
            style={{
              color:
                bet.status === 'frozen'
                  ? 'var(--color-blue-400)'
                  : bet.status === 'pending'
                  ? 'var(--color-yellow-500)'
                  : bet.status === 'active'
                  ? 'var(--color-green-500)'
                  : 'var(--color-red-500)',
              backgroundColor:
                bet.status === 'frozen'
                  ? 'hsl(from var(--color-blue-500) h s l / 0.2)'
                  : bet.status === 'pending'
                  ? 'hsl(from var(--color-yellow-500) h s l / 0.2)'
                  : bet.status === 'active'
                  ? 'hsl(from var(--color-green-500) h s l / 0.2)'
                  : 'hsl(from var(--color-red-500) h s l / 0.2)',
            }}>
            {capitalize(bet.status)}
          </div>
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
