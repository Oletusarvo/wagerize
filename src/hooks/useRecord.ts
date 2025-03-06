import { useCallback, useEffect, useState } from 'react';

export function useRecord(initialRecord: Record<string, any>) {
  const [record, setRecord] = useState(initialRecord || null);
  const updateOnChange = (e: any) => {
    const { name: rawName, type } = e.target;
    //Determine if the rawName is accessing a nested property
    const path = rawName.split('.');

    const value =
      type === 'number'
        ? e.target.value !== ''
          ? e.target.valueAsNumber
          : undefined
        : type === 'checkbox'
        ? e.target.checked
        : type === 'date'
        ? e.target.value === ''
          ? undefined
          : e.target.value
        : e.target.value;

    setRecord(prev => {
      const newRecord = prev !== null ? { ...prev } : {};
      let currentKey = null;
      path.map((key, i: number) => {
        const valueToSet = i < path.length - 1 ? { ...prev[key] } : value;
        if (currentKey) {
          newRecord[currentKey][key] = valueToSet;
          currentKey = key;
        } else {
          newRecord[key] = valueToSet;
          currentKey = key;
        }
      });

      return newRecord;
    });
  };

  return { record, updateOnChange };
}
