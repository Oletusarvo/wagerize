import { createFormData } from '@/utils/createFormData';
import { useState } from 'react';

export function useFormData(values: Record<string, unknown>) {
  const [formData, setFormData] = useState(() => {
    return createFormData(values);
  });

  const updateFormData = e => {
    setFormData(prev => {
      const fd = new FormData();
      for (const [key, val] of prev) {
        fd.set(key, val);
      }
      fd.set(e.target.name, e.target.type === 'checkbox' ? e.target.checked : e.target.value);
      return fd;
    });
  };

  return [formData, updateFormData] as const;
}
