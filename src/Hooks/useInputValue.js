import { useState } from "react";

export default function useInputValue (initialState){
  const [inputValue, setInputValue] = useState(initialState);

  const handleInputChange = event => {
    const { value } = event.target;

    setInputValue(value);
  };

  const clearInputs = () =>{
    setInputValue("")
  }
  return [inputValue, handleInputChange, clearInputs];
};

