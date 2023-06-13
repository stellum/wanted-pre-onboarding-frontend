import { useCallback, useState } from "react";

const useInputs = (initialValue) => {
  const [values, setValues] = useState(initialValue);

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues((values) => ({ ...values, [name]: value }));
  }, []);

  const reset = useCallback(() => setValues(initialValue), [initialValue]);

  return [values, onChange, reset];
};

export default useInputs;
