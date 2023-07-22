import { ChangeEvent, useState } from "react";
import QuestionBank from "./components/QuestionBank";
import Questions from "./components/Questions";
import Simulations from "./components/Simulations";
import Results from "./components/Results ";
import { CurrentViewType, Question } from "../types";
import { useSessionStorage } from "../utils";

const App = () => {
  const [questions, setQuestions] = useSessionStorage<Array<Question>>(
    "questions",
    []
  );
  const [userAnswers, setUserAnswers] = useSessionStorage<number[]>(
    "userAnswers",
    []
  );
  const [questionTimes, setQuestionTimes] = useState<number[]>([]);
  const [currentView, setCurrentView] = useSessionStorage<CurrentViewType>(
    "currentView",
    "questionBank"
  );
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedBasicArea, setSelectedBasicArea] = useState<string[]>([]);
  const [timeQuestions, setTimeQuestions] = useSessionStorage(
    "timeQuestions",
    0
  );

  const handleTimeQuestionsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTimeQuestions(Number(event.target.value));
  };

  const handleAnswer = (answer: number, index: number) => {
    setUserAnswers([
      ...userAnswers.slice(0, index),
      answer,
      ...userAnswers.slice(index + 1),
    ]);
  };

  const handleFinish = () => {
    setCurrentView("results");
  };

  const handleQuestionTimesChange = (newQuestionTimes: number[]) => {
    setQuestionTimes(newQuestionTimes);
  };

  const loadQuestions = () => {
    fetch("./data/questions.json", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        basic_areas: selectedBasicArea,
        specialties: selectedSpecialties,
        time: timeQuestions,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
        setCurrentView("questions");
      });
  };

  return (
    <>
      {currentView === "questionBank" && (
        <QuestionBank onButtonClick={() => setCurrentView("simulations")} />
      )}
      {currentView === "simulations" && (
        <Simulations
          selectedBasicArea={selectedBasicArea}
          selectedSpecialties={selectedSpecialties}
          timeQuestions={timeQuestions}
          setSelectedSpecialties={setSelectedSpecialties}
          setSelectedBasicArea={setSelectedBasicArea}
          handleTimeQuestionsChange={handleTimeQuestionsChange}
          onButtonClick={() => loadQuestions()}
        />
      )}
      {currentView === "results" ? (
        <Results
          userAnswers={userAnswers}
          questionList={questions}
          questionTimes={questionTimes}
          setSelectedSpecialties={setSelectedSpecialties}
          setSelectedBasicArea={setSelectedBasicArea}
          setTimeQuestions={setTimeQuestions}
          setUserAnswers={setUserAnswers}
          onButtonClick={() => setCurrentView("questionBank")}
        />
      ) : (
        currentView === "questions" &&
        (questions.length === 0 ? (
          <p>
            No hay preguntas que coincidan con las especialidades y áreas
            básicas seleccionadas.
            <button
              type="button"
              className="bg-blue-400"
              onClick={() => setCurrentView("questionBank")}
            >
              Volver a inicio
            </button>
          </p>
        ) : (
          <Questions
            userAnswers={userAnswers}
            onAnswer={handleAnswer}
            questionList={questions}
            onFinish={handleFinish}
            onQuestionTimesChange={handleQuestionTimesChange}
            timeRemaining={timeQuestions * 60}
          />
        ))
      )}
    </>
  );
};

export default App;
