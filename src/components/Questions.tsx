import { useState, useEffect, ChangeEventHandler } from "react";
import {
  formatTimeRemaining,
  handleFinish,
  handleNextQuestion,
  handlePreviousQuestion,
  useSessionStorage,
} from "../../utils";
import Countdown from "./Countdown";
import { Answer, QuestionsProps } from "../../types";
import CustomButton from "./CustomButton";
import { ArrowLeft } from "./icons/ArrowLeft";
import { ArrowRight } from "./icons/ArrowRight";
import CustomInput from "./CustomInput";
import { Toaster, toast } from "sonner";
import LogoFR from "./icons/LogoFR";

const Questions = ({
  questionList,
  onFinish,
  onQuestionTimesChange,
  userAnswers,
  setUserAnswers,
  isTimeUnlimited,
  timeRemaining: initialTimeRemaining,
}: QuestionsProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] =
    useSessionStorage<number>("currentQuestionIndex", 0);

  const currentQuestion = questionList[currentQuestionIndex];
  const [timeRemaining, setTimeRemaining] = useState(() => {
    const storedTimeRemaining = sessionStorage.getItem("timeRemaining");
    return storedTimeRemaining
      ? Number(storedTimeRemaining)
      : initialTimeRemaining;
  });
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [questionTimes, setQuestionTimes] = useState<number[]>(
    new Array(questionList.length).fill(0)
  );

  const [markedQuestions, setMarkedQuestions] = useSessionStorage<boolean[]>(
    "markedQuestions",
    new Array(questionList.length).fill(false)
  );
  const [viewedQuestions, setViewedQuestions] = useState<boolean[]>(
    new Array(questionList.length).fill(false)
  );
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [reporting, setReporting] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const initialReporting: { [key: number]: boolean } = {};
    questionList.forEach((_, index) => {
      if (markedQuestions[index]) {
        initialReporting[index] = true;
      }
    });
    setReporting(initialReporting);
  }, []);

  useEffect(() => {
    let timerId: number | undefined;

    if (currentQuestionIndex === questionList.length - 1) {
      clearInterval(timerId);
    } else {
      timerId = setInterval(() => {
        setQuestionTimes((prevTimes) => {
          const updatedTimes = [...prevTimes];
          updatedTimes[currentQuestionIndex] =
            prevTimes[currentQuestionIndex] + 1;
          return updatedTimes;
        });
      }, 1000);
    }

    return () => clearInterval(timerId);
  }, [currentQuestionIndex, questionList]);

  const isQuestionAnswered = (questionIndex: number) => {
    return (
      userAnswers[questionIndex] !== undefined &&
      userAnswers[questionIndex] !== null
    );
  };
  useEffect(() => {
    setViewedQuestions((prev) =>
      prev.map((viewed, index) =>
        index === currentQuestionIndex ? true : viewed
      )
    );
  }, [currentQuestionIndex]);

  const updateMarkedQuestions = (
    currentQuestionIndex: number,
    markedQuestions: boolean[]
  ) => {
    return markedQuestions.map((marked, index) =>
      index === currentQuestionIndex
        ? !isQuestionAnswered(currentQuestionIndex)
        : marked
    );
  };

  useEffect(() => {
    if (isQuestionAnswered(currentQuestionIndex)) {
      const newMarkedQuestions = updateMarkedQuestions(
        currentQuestionIndex,
        markedQuestions
      );
      setMarkedQuestions(newMarkedQuestions);
    }
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
    sessionStorage.setItem("isTimeUnlimited", JSON.stringify(isTimeUnlimited));
  }, [isTimeUnlimited]);

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

  const handleNext = () => {
    if (!isQuestionAnswered(currentQuestionIndex)) {
      const newMarkedQuestions = updateMarkedQuestions(
        currentQuestionIndex,
        markedQuestions
      );
      setMarkedQuestions(newMarkedQuestions);
    }

    if (currentQuestionIndex === questionList.length - 1) {
      const unansweredQuestions = questionList.filter(
        (_, index) => !isQuestionAnswered(index)
      );

      if (unansweredQuestions.length > 0) {
        toast.error(
          "Hay preguntas sin responder. Por favor, responda todas las preguntas antes de terminar."
        );
        return;
      }
    }
    handleNextQuestion(
      currentQuestionIndex,
      questionList.length,
      setCurrentQuestionIndex,
      () => {
        handleFinish(
          currentQuestionIndex,
          questionStartTime,
          questionTimes,
          onQuestionTimesChange,
          onFinish
        );
        setTimeRemaining(0);
      }
    );
  };

  const handlePrevious = () => {
    if (!isQuestionAnswered(currentQuestionIndex)) {
      const newMarkedQuestions = updateMarkedQuestions(
        currentQuestionIndex,
        markedQuestions
      );
      setMarkedQuestions(newMarkedQuestions);
    }

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
    <>
      <div className="p-10 bg-bg-primary min-h-screen w-full flex items-center justify-center">
        <div className="px-8 pt-5 pb-20 relative max-h-[calc(100vh - 40px)] bg-white w-full rounded-lg shadow-md">
          <Toaster richColors position="top-center" />
          <div className="flex justify-between items-center mb-4">
            <LogoFR />
            <Countdown
              timeRemaining={timeRemaining}
              formattedTimeRemaining={formattedTimeRemaining}
              isTimeUnlimited={isTimeUnlimited}
            />
          </div>

          <div className="flex">
            <div className="justify-center p-1 w-1/6 mr-4 bg-white border border-black border-solid rounded-lg mb-10 overflow-y-auto">
              <ul className="flex flex-col rounded-lg mt-4 overflow-y-scroll overflow-x-hidden max-h-96">
                {questionList.map((_question, index) => (
                  <li
                    key={index}
                    className={
                      currentQuestionIndex === index
                        ? "flex rounded-sm text-typogra gap-x-2 ml-2 font-bold w-full "
                        : ""
                    }
                  >
                    <div className="flex items-center text-typogra font-bold ml-6">
                      {!viewedQuestions[index] && (
                        <p className="bg-point-color h-2 w-2 rounded-full"></p>
                      )}
                      <span className="ml-2">{index + 1}</span>
                      {markedQuestions[index] && <span>🚩</span>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-3/4 ml-10 mb-10">
              <div className="flex justify-end gap-x-4 absolute left-0 pb-0 top-40 right-0 pr-24">
                {currentQuestionIndex > 0 && (
                  <CustomButton
                    title="Anterior"
                    btnType="button"
                    containerStyles="flex items-center px-5 py-2 text-sm text-gray-700 bg-btn-primary hover:bg-btn-primary-hover text-white font-bold mb-6 py-2 px-4 rounded mt-4"
                    handleClick={handlePrevious}
                    icon={<ArrowLeft />}
                  />
                )}
                <CustomButton
                  title={
                    currentQuestionIndex === questionList.length - 1
                      ? "Terminar"
                      : "Siguiente"
                  }
                  btnType="button"
                  containerStyles="flex items-center px-5 py-2 text-sm text-gray-700 bg-btn-primary hover:bg-btn-primary-hover text-white font-bold mb-6 py-2 px-4 rounded mt-4"
                  handleClick={handleNext}
                  iconPosition="after"
                  icon={<ArrowRight />}
                />
              </div>
              <div className="flex justify-between gap-x-4 mb-24">
                <div className="text-lg font-bold text-typogra">
                  Pregunta {currentQuestionIndex + 1} de {questionList.length}
                </div>
                <CustomInput
                  inputType="checkbox"
                  titleLabel="Marcar pregunta"
                  styleLabel="flex items-center mr-2"
                  inputStyle="mr-2 h-5 w-5 cursor-pointer form-checkbox bg-white rounded-full border border-gray-300 appearance-none outline-none checked:bg-check-color"
                  labelPosition="after"
                  isChecked={markedQuestions[currentQuestionIndex]}
                  handleChange={markQuestion}
                />
                <CustomInput
                  inputType="checkbox"
                  titleLabel="Reportar pregunta"
                  styleLabel="flex items-center"
                  inputStyle="mr-2 h-5 w-5 cursor-pointer form-checkbox bg-white rounded-full border border-gray-300 appearance-none outline-none checked:bg-check-color"
                  labelPosition="after"
                  isChecked={reporting[currentQuestionIndex] || false}
                  handleChange={(e) => {
                    setReporting((prev) => ({
                      ...prev,
                      [currentQuestionIndex]: e.target.checked,
                    }));
                  }}
                />
              </div>
              <p className="mb-4 text-gray-600">{currentQuestion.statement}</p>
              <div className="mb-4">
                {Object.values(currentQuestion.options).map((option, index) => {
                  if (option.label == "") {
                    return null;
                  }
                  return (
                    <label
                      key={index}
                      className="flex items-center w-full mb-2 bg-slate-50 border border-solid p-1 rounded-md pl-3"
                    >
                      <input
                        value={option.id}
                        checked={
                          userAnswers.find(
                            (userAnswer) =>
                              userAnswer.questionId === currentQuestion.id
                          )?.answerId === option.id
                        }
                        onChange={(e) => {
                          let newAnswers: Answer[] = [...userAnswers];
                          if (
                            userAnswers.find(
                              (selected) =>
                                selected.questionId === currentQuestion.id
                            )
                          ) {
                            newAnswers = userAnswers.filter(
                              (selected) =>
                                selected.questionId !== currentQuestion.id
                            );
                          }
                          const timeToAnswerInSeconds =
                            timeElapsed + questionTimes[currentQuestionIndex];
                          newAnswers = [
                            ...newAnswers,
                            {
                              questionId: currentQuestion.id,
                              answerId: option.id,
                              index: currentQuestionIndex,
                              report: reporting,
                              timeToAnswerInSeconds:
                              timeToAnswerInSeconds.toString(),
                            },
                          ];
                          setUserAnswers(newAnswers);
                        }}
                        type="radio"
                        name="respuesta"
                        className="mr-2 accent-blue-700 h-4 w-4 cursor-pointer"
                      />
                      <span className="text-gray-700">{option.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Questions;
