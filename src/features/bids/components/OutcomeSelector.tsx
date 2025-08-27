'use client';

import { List } from '@/components/feature/List';
import { RadioButton } from '@/components/feature/RadioButton';

export function OutcomeSelector({ selectedValue, values, onChange }) {
  return (
    <List<{ id: string; label: string }>
      data={values}
      component={({ item }) => {
        return (
          <RadioButton
            name='outcome'
            value={item.id}
            selectedValue={selectedValue}
            label={item.label}
            onClick={value => onChange(value)}
          />
        );
      }}
    />
  );
}
