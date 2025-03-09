'use client';

export default function Error({ err }) {
  return (
    <main className='flex flex-col items-center justify-center w-full flex-1'>
      <h1 className='text-accent font-semibold'>Oops! We encountered an error</h1>
      <p className='text-black'>{err.message}</p>
    </main>
  );
}
