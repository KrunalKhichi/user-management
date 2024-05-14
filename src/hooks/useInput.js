import { useState } from 'react';

const useInput = (initialValue, charLimit, regex) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState('')

  const onChange = (e) => {
    const { value } = e?.target || '';

    if ((!charLimit || value.length <= charLimit) && (!regex || regex.test(value))) {
      setValue(e.target.value);
      setError('');
    }
  };

  const setErrorExternally = (errorMsg) => {
    setError(errorMsg);
  };

  return {
    value,
    onChange,
    error,
    setError: setErrorExternally,
  };
};

export default useInput;
