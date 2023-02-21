import { useState } from "react";

function useInput(validateInput) {
  const [inputValue, setInputValue] = useState("");
  const [wasTouched, setWasTouched] = useState(false);

  const isInputInvalid = validateInput(inputValue);
  const hasError = !isInputInvalid && wasTouched;

  function handleInputChange(e) {
    setInputValue(e.target.value);
  }

  function handleInputBlur() {
    setWasTouched(true);
  }

  function resetInput() {
    setInputValue("");
    setWasTouched(false);
  }

  return {
    value: inputValue,
    wasTouched,
    hasError,
    handleInputChange,
    handleInputBlur,
    resetInput,
  };
}

export default useInput;
