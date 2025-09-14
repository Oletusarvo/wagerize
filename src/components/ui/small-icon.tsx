import { LogOut, LucideProps } from 'lucide-react';

export function SmallIcon({ component: Component }: { component: typeof LogOut }) {
  return <Component size='16px' />;
}
