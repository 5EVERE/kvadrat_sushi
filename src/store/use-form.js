import { useState } from "react";
const useForm = function (funcInvalid) {
  const [inputValue, setInputValue] = useState("");
  const [isInputInvalid, setIsInputInvalid] = useState(false);
  const invalidFormValue = funcInvalid(inputValue);
  const changeInputHandler = function (e) {
    setInputValue(e.target.value);
    if (e.target.value !== "") {
      setIsInputInvalid(false);
    }
  };
  const resetInput = function(){
    setInputValue("");
    setIsInputInvalid(false);
  }   
  const blurHandler  = function(){
    if(invalidFormValue){
        setIsInputInvalid(true);
    }
  }
  return {
    inputValue,
    isInputInvalid,
    changeInputHandler,
    resetInput,
    blurHandler,
    invalidFormValue,
  };
};
export default useForm;
