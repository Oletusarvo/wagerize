import { Container } from '../ui/Container';

export function RadioButton({ onClick, value, selectedValue, label, name }) {
  console.log('Radio button value: ', value);
  const changeValue = () => {
    onClick(value !== selectedValue ? value : undefined);
  };
  return (
    <Container
      as='div'
      onClick={() => changeValue()}>
      <div className='flex w-full justify-between items-center'>
        <h1 className='w-full'>{label}</h1>
        <input
          type='radio'
          name={name}
          checked={selectedValue === value}
          onChange={e => changeValue()}
        />
      </div>
    </Container>
  );
}
