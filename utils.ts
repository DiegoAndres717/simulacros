import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { FormErrors, SelectableItem, ValidationRules } from "./types";
export const handleNextQuestion = (
  currentQuestionIndex: number,
  questionListLength: number,
  setCurrentQuestionIndex: (index: number) => void,
  handleFinish: () => void
): void => {
  if (currentQuestionIndex < questionListLength - 1) {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  } else {
    handleFinish();
  }
};

export function handleFinish(
  currentQuestionIndex: number,
  questionStartTime: number,
  questionTimes: number[],
  onQuestionTimesChange: (questionTimes: number[]) => void,
  onFinish: () => void
): void {
  const timeElapsed = Math.round((Date.now() - questionStartTime) / 1000);
  onQuestionTimesChange([
    ...questionTimes.slice(0, currentQuestionIndex),
    timeElapsed,
    ...questionTimes.slice(currentQuestionIndex + 1),
  ]);
  onFinish();
}

export const handlePreviousQuestion = (
  currentQuestionIndex: number,
  setCurrentQuestionIndex: (index: number) => void
): void => {
  if (currentQuestionIndex > 0) {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  }
};

export function formatTimeRemaining(timeRemaining: number) {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${minutes}:${formattedSeconds}`;
}

export const handleStart = (
  selectedSpecialties: string[],
  selectedBasicArea: string[],
  numQuestions: number,
  timeQuestions: number,
  nameQuestions: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toast: any,
  onButtonClick: () => void,
  handleFormErrors: (errors: FormErrors) => void
) => {
  let hasError = false;
  const formErrors: FormErrors = {};

  // Validar la entrada del usuario
  if (selectedSpecialties.length < 4) {
    hasError = true;
    formErrors.checkSpecialties = true;
  }
  /* if (selectedBasicArea.length === 0) {
    hasError = true;
    formErrors.checkBasicArea = true;
  } */
  if (numQuestions < 20 || numQuestions > 100) {
    hasError = true;
    formErrors.numQuestions = true;
  }
  if (timeQuestions < 1) {
    hasError = true;
    formErrors.timeQuestions = true;
  }
  if (nameQuestions.length === 0) {
    hasError = true;
    formErrors.nameQuestions = true;
  }

  // Mostrar un mensaje de error si alguna validación falló
  if (hasError) {
    toast.error("Por favor, verifica que todos los campos estén correctos.");
    handleFormErrors(formErrors);
    return;
  }

  // Navegar a la página Questions
  onButtonClick();
};


export const handleChangeGeneral = (
  event: ChangeEvent<HTMLInputElement>,
  selectedItems: string[],
  setState: Dispatch<SetStateAction<string[]>>
) => {
  const item = event.target.name;
  let newSelectedItems;
  if (event.target.checked) {
    newSelectedItems = [...selectedItems, item];
    setState(newSelectedItems);
  } else {
    newSelectedItems = selectedItems.filter((i) => i !== item);
    setState(newSelectedItems);
  }
  return newSelectedItems;
};


export const handleSelectAll = (
  event: ChangeEvent<HTMLInputElement>,
  items: SelectableItem[],
  setSelectedItems: (items: string[]) => void
) => {
  if (event.target.checked) {
    setSelectedItems(items.map((item) => item.name));
  } else {
    setSelectedItems([]);
  }
};

export const useSessionStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = (value: T) => {
    setStoredValue(value);
    sessionStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue];
};

export const validateInput = (
  value: string | number | boolean,
  type: string,
  rules: ValidationRules = {}
) => {
  switch (type) {
    case "number":
      if (typeof value === "number") {
        if (rules.min !== undefined && value < rules.min) {
          return false;
        }
        if (rules.max !== undefined && value > rules.max) {
          return false;
        }
      }
      return true;
    case "text":
      if (typeof value === "string") {
        return value.length > 0;
      }
      return false
    case "checkbox":
      if (typeof value === 'boolean') {
        return value === true;
      }
      return false
    default:
      return true;
  }
};

