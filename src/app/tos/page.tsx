export default async function TOSPage() {
  return (
    <main className='flex w-full overflow-y-scroll flex-1'>
      <iframe
        src='/tos.pdf'
        className='w-full h-full'
      />
    </main>
  );
}
