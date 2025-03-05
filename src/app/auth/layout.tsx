import { WalletDisplay } from '@/features/users/components/WalletDisplay';

export default function AuthLayout({ children }) {
  return (
    <>
      <WalletDisplay />
      {children}
    </>
  );
}
