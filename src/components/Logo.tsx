import Casino from '@mui/icons-material/Casino';
import pkg from 'betting_app/package.json';

export function Logo() {
  return (
    <div className='flex gap-1 items-center'>
      <Casino sx={{ transform: 'rotate(45deg)' }} />
      <h1 className='text-xl font-semibold'>{pkg.name}</h1>
    </div>
  );
}
