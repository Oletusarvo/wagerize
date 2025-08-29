import { Spinner } from '@/components/ui/spinner';
import { withAlternate } from './with-alterante';

export function withLoader<PropsT extends React.PropsWithChildren>(Component: React.FC<PropsT>) {
  return ({ children, loading, ...props }: PropsT & { loading?: boolean }) => {
    const Enhanced = withAlternate(Component, false);
    return (
      <Enhanced
        {...(props as PropsT)}
        alternate={<Spinner />}
        showAlternate={loading}>
        {children}
      </Enhanced>
    );
  };
}
