import { useState } from 'react';
import { useValidation } from './useValidation';

export const useInput = (initialValue, rules) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false);
  const errors = useValidation(value, rules)

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onBlur = (e) => {
    setDirty(true);
  };

  return {
    value,
    onChange,
    onBlur,
    isDirty,
    errors
  }
}