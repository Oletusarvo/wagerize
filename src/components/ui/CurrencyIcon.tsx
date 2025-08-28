import { Dice5 } from 'lucide-react';

export function CurrencyIcon(props) {
  return (
    <Dice5
      {...props}
      sx={{ ...props.sx, transform: 'rotate(45deg)' }}
    />
  );
}
