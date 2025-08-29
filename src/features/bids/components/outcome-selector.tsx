'use client';

import { List } from '@/components/feature/list-temp';
import { RadioButton } from '@/components/feature/radio-button';

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
