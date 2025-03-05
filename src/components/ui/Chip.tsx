import { Clear } from '@mui/icons-material';
import { ReactNode } from 'react';

export function Chip({ children, icon, onDelete }: ChipProps) {
  return (
    <div className='flex gap-2 py-2 px-4 rounded-[100px] bg-accent min-w-[4rem] justify-center text-white items-center text-sm'>
      {icon}
      <span className='font-semibold'>{children}</span>
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
  onDelete?: () => void;
  icon?: ReactNode;
};
