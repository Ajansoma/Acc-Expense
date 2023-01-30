import { useState } from "react";
const useForm = function (valueInput) {
  const [enteredInput, setEnteredInput] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const inputIsValid = valueInput(enteredInput);
  const inputIsInvalid = isTouched && !inputIsValid;

  const inputBlurHandler = function () {
    setIsTouched(true);
  };
  const inputHandler = function (e) {
    setEnteredInput(e.target.value);
  };

  const reset = function () {
    setEnteredInput("");
    setIsTouched(false);
  };

  return {
    enteredInput,
    inputIsValid,
    inputIsInvalid,
    inputBlurHandler,
    inputHandler,
    reset,
    isTouched,
  };
};
export default useForm;
