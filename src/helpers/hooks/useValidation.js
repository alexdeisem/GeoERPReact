import { useEffect, useState } from 'react';

export const useValidation = (value, rules) => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [maxLengthError, setMaxLengthError] = useState(false);

  useEffect(() => {
    for (const rule in rules) {
      switch (rule) {

        case 'required':
          value ? setIsEmpty(false) : setIsEmpty(true)
          break;

        case 'minLength':
          value.length < rules[rule] 
            ? setMinLengthError(true)
            : setMinLengthError(false)
          break;

        case 'maxLength':
          value.length > rules[rule]
            ? setMaxLengthError(true)
            : setMaxLengthError(false)
          break;

        default:
          break;
      }
    }
  }, [value]);

  return [
    isEmpty ? 'Поле не может быть пустым' : undefined,
    minLengthError ? 'Поле не может быть короче ' + rules.minLength : undefined,
    maxLengthError ? 'Поле не может быть длинее ' + rules.maxLength : undefined,
  ].filter(i => i !== undefined);
}