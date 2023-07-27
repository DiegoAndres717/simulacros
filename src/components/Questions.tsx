import { useState, useEffect, ChangeEventHandler } from "react";
import {
  formatTimeRemaining,
  handleFinish,
  handleNextQuestion,
  handlePreviousQuestion,
} from "../../utils";
import Countdown from "./Countdown";
import { QuestionsProps } from "../../types";
import CustomButton from "./CustomButton";
import { ArrowLeft } from "./icons/ArrowLeft";
import { ArrowRight } from "./icons/ArrowRight";
import CustomInput from "./CustomInput";
import { Toaster, toast } from "sonner";

const Questions = ({
  questionList,
  onFinish,
  onQuestionTimesChange,
  onAnswer,
  userAnswers,
  setUserAnswers,
  isTimeUnlimited,
  timeRemaining: initialTimeRemaining,
}: QuestionsProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = questionList[currentQuestionIndex];
  const [timeRemaining, setTimeRemaining] = useState(() => {
    const storedTimeRemaining = sessionStorage.getItem("timeRemaining");
    return storedTimeRemaining ? Number(storedTimeRemaining) : initialTimeRemaining;
  });
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [questionTimes, setQuestionTimes] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [markedQuestions, setMarkedQuestions] = useState<boolean[]>(
    new Array(questionList.length).fill(false)
  );
  const [viewedQuestions, setViewedQuestions] = useState<boolean[]>(
    new Array(questionList.length).fill(false)
  );
  
  useEffect(() => {
    setViewedQuestions((prev) =>
      prev.map((viewed, index) => (index === currentQuestionIndex ? true : viewed))
    );
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (isQuestionAnswered(currentQuestionIndex)) {
      setMarkedQuestions((prev) =>
        prev.map((marked, index) =>
          index === currentQuestionIndex ? false : marked
        )
      );
    }
  }, [currentQuestionIndex, userAnswers]);

  useEffect(() => {
    setSelectedAnswer(userAnswers[currentQuestionIndex]);
  }, [currentQuestionIndex, userAnswers]);

  useEffect(() => {
    if (!isTimeUnlimited) {
      const intervalId = setInterval(() => {
        setTimeRemaining((time) => time - 1);
      }, 1000);
  
      return () => clearInterval(intervalId);
    }
  }, [isTimeUnlimited]);

  useEffect(() => {
    if (timeRemaining === 0) {
      onFinish();
    }
  }, [timeRemaining, onFinish]);

  useEffect(() => {
    sessionStorage.setItem("timeRemaining", timeRemaining.toString());
  }, [timeRemaining]);

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

  const isQuestionAnswered = (questionIndex: number) => {
    return userAnswers[questionIndex] !== undefined;
  };
  
  const handleNext = () => {
    if (!isQuestionAnswered(currentQuestionIndex)) {
      setMarkedQuestions((prev) =>
        prev.map((marked, index) =>
          index === currentQuestionIndex ? true : marked
        )
      );
    }
    
    if (currentQuestionIndex === questionList.length - 1) {
      const unansweredQuestions = questionList.filter(
        (_, index) => !isQuestionAnswered(index)
      );
      
      if (unansweredQuestions.length > 0) {
        toast.error("Hay preguntas sin responder. Por favor, responda todas las preguntas antes de terminar.");
        return;
      }
    }
    handleNextQuestion(
      selectedAnswer,
      currentQuestionIndex,
      onAnswer,
      questionList.length,
      setCurrentQuestionIndex,
      setSelectedAnswer,
      () =>{
        handleFinish(
          selectedAnswer,
          currentQuestionIndex,
          onAnswer,
          questionStartTime,
          questionTimes,
          onQuestionTimesChange,
          onFinish
        )
        setTimeRemaining(0);
      }
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

  const formattedTimeRemaining = formatTimeRemaining(timeRemaining);

  return (
    <div className="p-4">
      <Toaster richColors position="top-center" />
      <div className="flex justify-between items-center mb-4">
        <div className="ml-8 text-lg font-semibold">
          Pregunta {currentQuestionIndex + 1} de {questionList.length}
        </div>
        <div className="flex gap-x-4">
          <CustomInput 
            inputType="checkbox"
            titleLabel="Marcar pregunta"
            styleLabel="flex items-center mr-2"
            inputStyle="mr-2 h-4 w-4 accent-blue-700 cursor-pointer"
            labelPosition='after'
            isChecked={markedQuestions[currentQuestionIndex]}
            handleChange={markQuestion}
          />
          <CustomInput 
            inputType="checkbox"
            titleLabel="Reportar pregunta"
            styleLabel="flex items-center"
            inputStyle="mr-2 h-4 w-4 accent-blue-700 cursor-pointer"
            labelPosition='after'
          />
        </div>
        <Countdown
          timeRemaining={timeRemaining}
          formattedTimeRemaining={formattedTimeRemaining}
          isTimeUnlimited={isTimeUnlimited}
        />
      </div>

      <div className="flex">
        <div className="justify-center w-1/6 mr-4 bg-slate-100 rounded-lg">
          <ul className="flex flex-col items-center justify-center text-gray-500 rounded-lg">
            {questionList.map((_question, index) => (
              <li
                key={index}
                className={
                  currentQuestionIndex === index
                    ? "flex items-center justify-center rounded-sm text-black gap-x-2 font-semibold bg-slate-300 w-full "
                    : ""
                }
              >
                <div className="text-black">
                {!viewedQuestions[index] && <span>•</span>}
                <span className="ml-2">{index + 1}</span>
                {markedQuestions[index] && <span>🚩</span>}
                </div>
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
            {Object.values(currentQuestion.options).map((option, index) => (
                <label key={index} className="flex items-center mb-2 bg-slate-100 p-1 rounded-full pl-3">
                  <input
                    value={index}
                    checked={selectedAnswer === index}
                    onChange={(e) => {
                      setSelectedAnswer(Number(e.target.value));
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = Number(e.target.value);
    setUserAnswers(newAnswers);
                    }}
                    type="radio"
                    name="respuesta"
                    className="mr-2 accent-blue-700 h-4 w-4 cursor-pointer"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
))}
          </div>
          <div className="flex justify-end gap-x-4">
            <CustomButton
              title="Anterior"
              btnType="button"
              containerStyles="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100"
              handleClick={handlePrevious}
              icon={<ArrowLeft />}
            />
            <CustomButton
              title={
                currentQuestionIndex === questionList.length - 1
                  ? "Terminar"
                  : "Siguiente"
              }
              btnType="button"
              containerStyles="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100"
              handleClick={handleNext}
              iconPosition="after"
              icon={<ArrowRight />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;