import { useClassName } from '@/hooks/useClassName';
import { Clear } from '@mui/icons-material';
import { ReactNode } from 'react';

export function Chip({ children, icon, onDelete, variant = 'contained' }: ChipProps) {
  const className = useClassName(['chip', variant, '--accent']);

  return (
    <div className={className}>
      {icon}
      <span>{children}</span>
      {onDelete && (
        <Clear
          sx={{ fontSize: '1rem' }}
          onClick={onDelete}
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
