export default async function PrivacyPolicyPage() {
  return (
    <div className='flex w-full overflow-y-scroll flex-1'>
      <iframe
        src='/privacy.pdf'
        className='w-full h-full'
      />
    </div>
  );
}
