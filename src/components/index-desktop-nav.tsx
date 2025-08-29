import Link from 'next/link';

export function IndexDesktopNav() {
  return (
    <nav className='gap-8 xs:hidden lg:flex lg:items-center xs:items-none lg:text-sm'>
      <Link href='/login'>Login</Link>
      <Link
        href='/register'
        className='xs:p-0 xs:rounded-none lg:py-2 lg:px-4 lg:rounded-[100px] lg:border-1 lg:border-accent md:hover:bg-accent-background transition-colors duration-300'>
        Sign Up
      </Link>
    </nav>
  );
}
