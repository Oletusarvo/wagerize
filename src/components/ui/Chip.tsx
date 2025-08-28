import { useClassName } from '@/hooks/useClassName';
import { X } from 'lucide-react';
import { ReactNode } from 'react';

export function Chip({ children, icon, onDelete, variant = 'contained' }: ChipProps) {
  const className = useClassName('chip text-black', variant, '--accent');

  return (
    <div className={className}>
      {icon}
      <span className='text-black'>{children}</span>
      {onDelete && (
        <X
          onClick={onDelete}
          size='16px'
          color='black'
        />
      )}
    </div>
  );
}

type ChipProps = React.PropsWithChildren & {
  variant?: 'outlined' | 'contained';
  onDelete?: () => void;
  icon?: ReactNode;
};
