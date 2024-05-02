import React, { useState, useCallback } from "react";

// Creating a Input hook
function useInput(defaultValue = "") {
  const [value, setValue] = useState(defaultValue);

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return {
    value,
    onChange
  };
}

export default useInput;
