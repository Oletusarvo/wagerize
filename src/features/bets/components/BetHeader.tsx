'use client';

import { DataPoint } from '@/components/DataPoint';
import { Icon } from '@/components/ui/Icon';
import { LockClock, Share, TimeToLeave } from '@mui/icons-material';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import { IconButton } from '@mui/material';
import toast from 'react-hot-toast';

export function BetHeader({ bet }) {
  const timeLeft = bet.expires_at ? bet.expires_at.getTime() - Date.now() : null;

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard.');
  };

  return (
    <div className='flex w-full justify-between'>
      <div className='flex gap-2'>
        <DataPoint
          IconComponent={ArrowDownward}
          content={<>{bet.data.min_bid}D</>}
        />
        <IconButton onClick={copyLinkToClipboard}>
          <Icon Component={Share} />
        </IconButton>
      </div>

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
