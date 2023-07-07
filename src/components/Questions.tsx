import {
  useState,
  useEffect,
  MouseEventHandler,
  ChangeEventHandler,
} from "react";
import type { ListQuestion } from "../types";
import { handleFinish, handleNextQuestion, handlePreviousQuestion } from '../../utils';

interface QuestionsProps {
  questionList: ListQuestion;
  onFinish: () => void;
  onQuestionTimesChange: (questionTimes: number[]) => void;
  onAnswer: (answer: number, index: number) => void;
  userAnswers: number[];
}

const Questions = ({
  questionList,
  onFinish,
  onQuestionTimesChange,
  onAnswer,
  userAnswers,
}: QuestionsProps): JSX.Element => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = questionList[currentQuestionIndex];
  const [timeRemaining, setTimeRemaining] = useState<number>(300);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [questionTimes, setQuestionTimes] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [markedQuestions, setMarkedQuestions] = useState<boolean[]>(
    new Array(questionList.length).fill(false)
  );

  useEffect(() => {
    setSelectedAnswer(userAnswers[currentQuestionIndex]);
  }, [currentQuestionIndex, userAnswers]);

  useEffect(() => {
    const intervalId: number = setInterval(() => {
      setTimeRemaining((time) => time - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (timeRemaining === 0) {
      onFinish();
    }
  }, [timeRemaining, onFinish]);

  useEffect(() => {
    if (currentQuestionIndex > 0) {
      const timeElapsed = Math.round((Date.now() - questionStartTime) / 1000);
      setQuestionTimes([
        ...questionTimes.slice(0, currentQuestionIndex - 1),
        timeElapsed,
        ...questionTimes.slice(currentQuestionIndex),
      ]);
      onQuestionTimesChange([
        ...questionTimes.slice(0, currentQuestionIndex - 1),
        timeElapsed,
        ...questionTimes.slice(currentQuestionIndex),
      ]);
    }
    setQuestionStartTime(Date.now());
  }, [currentQuestionIndex]);

  const handleNext: MouseEventHandler<HTMLButtonElement> = () => {
    handleNextQuestion(
      selectedAnswer,
      currentQuestionIndex,
      onAnswer,
      questionList.length,
      setCurrentQuestionIndex,
      setSelectedAnswer,
      () =>
        handleFinish(
          selectedAnswer,
          currentQuestionIndex,
          onAnswer,
          questionStartTime,
          questionTimes,
          onQuestionTimesChange,
          onFinish
        )
    );
  };

  const handlePrevious = () => {
    handlePreviousQuestion(currentQuestionIndex, setCurrentQuestionIndex);
  };

  const markQuestion: ChangeEventHandler<HTMLInputElement> = (e) =>
    setMarkedQuestions([
      ...markedQuestions.slice(0, currentQuestionIndex),
      e.target.checked,
      ...markedQuestions.slice(currentQuestionIndex + 1),
    ]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="ml-8 text-lg font-semibold">
          Pregunta {currentQuestionIndex + 1} de {questionList.length}
        </div>
        <div className="flex gap-x-4">
          <label className="flex items-center mr-2">
            <input
              checked={markedQuestions[currentQuestionIndex]}
              onChange={markQuestion}
              type="checkbox"
              className="mr-2 h-4 w-4 accent-blue-700 cursor-pointer"
            />
            Marcar pregunta
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2 h-4 w-4 accent-blue-700 cursor-pointer"
            />
            Reportar pregunta
          </label>
        </div>
        <div className="text-lg font-semibold">
          Tiempo restante: {Math.floor(timeRemaining / 60)}:
          {timeRemaining % 60 < 10
            ? `0${timeRemaining % 60}`
            : timeRemaining % 60}
        </div>
      </div>

      <div className="flex">
        <div className="justify-center w-1/6 mr-4 bg-slate-100 rounded-lg">
          <ul className="flex flex-col items-center justify-center text-gray-500 rounded-lg">
            {questionList.map((question, index) => (
              <li
                key={index}
                className={
                  currentQuestionIndex === index
                    ? "flex items-center justify-center rounded-sm gap-x-2 font-semibold bg-slate-300 w-full "
                    : ""
                }
              >
                {index + 1}
                {markedQuestions[index] && <span>🚩</span>}
              </li>
            ))}
          </ul>
        </div>

        <div className="w-3/4 p-10">
          <h2 className="text-xl font-bold mb-2">
            Pregunta {currentQuestionIndex + 1}
          </h2>
          <p className="mb-4 text-gray-600">{currentQuestion.statement}</p>
          <div className="mb-4">
            {currentQuestion.options.map((option, index) => (
              <label key={index}>
                <label className="flex items-center mb-2 bg-slate-100 p-1 rounded-full pl-3">
                  <input
                    value={index}
                    checked={selectedAnswer === index}
                    onChange={(e) => setSelectedAnswer(Number(e.target.value))}
                    type="radio"
                    name="respuesta"
                    className="mr-2 accent-blue-700 h-4 w-4 cursor-pointer"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              </label>
            ))}
          </div>
          <div className="flex justify-end gap-x-4">
            <button
              onClick={handlePrevious}
              className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                />
              </svg>
              Anterior
            </button>
            <button
              onClick={handleNext}
              className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100"
            >
              {currentQuestionIndex === questionList.length - 1
                ? "Terminar"
                : "Siguiente"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
