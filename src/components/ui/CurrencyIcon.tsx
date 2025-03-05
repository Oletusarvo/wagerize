import { Casino } from '@mui/icons-material';

export function CurrencyIcon(props) {
  return (
    <Casino
      {...props}
      sx={{ ...props.sx, transform: 'rotate(45deg)' }}
    />
  );
}
