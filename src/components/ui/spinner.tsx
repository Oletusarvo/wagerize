'use client';

import { useClassName } from '@/hooks/use-class-name';

export function Spinner({ size = 'default' }: SpinnerProps) {
  const className = useClassName(
    'w-4 h-4 aspect-square rounded-full border-2 border-white border-t-accent animate-spin border-t-4',
    size === 'large' ? 'w-[1.5rem] h-[1.5rem]' : 'w-4 h-4'
  );

  return <div className={className} />;
}

type SpinnerProps = {
  size?: 'default' | 'large';
};
