import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { SelectableItem } from "./types";
export const handleNextQuestion = (
  selectedAnswer: number | null,
  currentQuestionIndex: number,
  onAnswer: (answer: number, index: number) => void,
  questionListLength: number,
  setCurrentQuestionIndex: (index: number) => void,
  setSelectedAnswer: (answer: number | null) => void,
  handleFinish: () => void
): void => {
  if (selectedAnswer !== null) {
    onAnswer(selectedAnswer, currentQuestionIndex);
  }
  if (currentQuestionIndex < questionListLength - 1) {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedAnswer(null);
  } else {
    handleFinish();
  }
};

export function handleFinish(
  selectedAnswer: number | null,
  currentQuestionIndex: number,
  onAnswer: (answer: number, index: number) => void,
  questionStartTime: number,
  questionTimes: number[],
  onQuestionTimesChange: (questionTimes: number[]) => void,
  onFinish: () => void
): void {
  if (selectedAnswer !== null) {
    onAnswer(selectedAnswer, currentQuestionIndex);
  }
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
  onButtonClick: () => void
) => {
  // Validar la entrada del usuario
  if (selectedSpecialties.length < 4) {
    toast.error("Por favor, selecciona al menos 4 especialidades");
    return;
  }
  if (selectedBasicArea.length === 0) {
    toast.error("Por favor, selecciona al menos una área básica.");
    return;
  }
  if (numQuestions < 20 || numQuestions > 100) {
    toast.error("Por favor, elige un número de preguntas entre 20 y 100.");
    return;
  }
  if (timeQuestions <= 0) {
    toast.error("Por favor, elige un tiempo válido.");
    return;
  }
  if (nameQuestions.length === 0) {
    toast.error("Por favor, escriba un nombre de silumacro");
    return;
  }

  // Navegar a la página Questions
  onButtonClick();
};

export const handleChangeGeneral = (
  event: ChangeEvent<HTMLInputElement>,
  prevSelectedStudyArea: Dispatch<SetStateAction<string[]>>
) => {
  const item = event.target.name;
  if (event.target.checked) {
    prevSelectedStudyArea((prevSelectedItems) => [...prevSelectedItems, item]);
  } else {
    prevSelectedStudyArea((prevSelectedItems) =>
      prevSelectedItems.filter((i) => i !== item)
    );
  }
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
