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
  
export function handleFinish(selectedAnswer: number | null,
    currentQuestionIndex: number,
    onAnswer: (answer: number, index: number) => void,
    questionStartTime: number,
    questionTimes: number[],
    onQuestionTimesChange: (questionTimes: number[]) => void,
    onFinish: () => void): void {
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

  
  