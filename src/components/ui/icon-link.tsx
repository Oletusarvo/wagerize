import { withIcon } from '@/hoc/with-icon';
import Link from 'next/link';

export const IconLink = withIcon(({ children, ...props }: React.ComponentProps<typeof Link>) => {
  return (
    <Link
      {...props}
      className='flex gap-2 items-center'>
      {children}
    </Link>
  );
});
