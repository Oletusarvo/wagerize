import { Clear } from '@mui/icons-material';

export function Chip({ children, onDelete }) {
  return (
    <div className='flex gap-2 p-2 rounded-[100px] bg-accent min-w-[4rem] justify-center text-white items-center text-sm'>
      <span>{children}</span>
      <Clear
        sx={{ fontSize: '1rem' }}
        onClick={onDelete}
      />
    </div>
  );
}
