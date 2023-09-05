import { ChangeEvent, useState } from "react";
import QuestionBank from "./components/QuestionBank";
import Questions from "./components/Questions";
import Simulations from "./components/Simulations";
import ResultsScreen from "./components/Results ";
import { Answer, CurrentViewType, FormErrors, Question, Results, SelectedSettings } from "../types";
import { useSessionStorage, validateInput } from "../utils";

const default_settings = {
  number_of_questions: 20,
  time_in_minutes: 40,
  name: "Simulacro 1",
  unlimited: false
}

const App = () => {
  const [selectedSettings, setSelectedSettings] = useState<SelectedSettings>(default_settings);
  const [questions, setQuestions] = useSessionStorage<Array<Question>>(
    "questions",
    []
  );
  const [userAnswers, setUserAnswers] = useSessionStorage<Answer[]>(
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
    40
  );
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isTimeUnlimited, setIsTimeUnlimited] = useSessionStorage("isTimeUnlimited", false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useSessionStorage<Results|null>('results',null);

  const handleTimeQuestionsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTimeQuestions(Number(value));
    const isValid = validateInput(Number(value), "number", { min: 40 });
    setFormErrors((prev) => ({ ...prev, timeQuestions: !isValid }));
  };

  const handleQuestionTimesChange = (newQuestionTimes: number[]) => {
    setQuestionTimes(newQuestionTimes);
  };
  const handleTimeUnlimitedChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsTimeUnlimited(event.target.checked);
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
  const getResults = () => {
    setLoading(true);
    fetch("./data/results.json", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        answers: userAnswers
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setResults(data);
        setCurrentView("results");
        setLoading(false);
      });
  }
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
          formErrors={formErrors}
          setFormErrors={setFormErrors}
          setSelectedSpecialties={setSelectedSpecialties}
          setSelectedBasicArea={setSelectedBasicArea}
          handleTimeQuestionsChange={handleTimeQuestionsChange}
          onButtonClick={() => loadQuestions()}
          handleTimeUnlimitedChange={handleTimeUnlimitedChange}
        />
      )}
      {currentView === "results" && results ? (
        <ResultsScreen
          results = {results}
          onButtonClick={() => {
            setUserAnswers([]);
            setSelectedSettings(default_settings);
            setCurrentView("questionBank");
          }}
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
            setUserAnswers={setUserAnswers}
            questionList={questions}
            onFinish={getResults}
            isTimeUnlimited={selectedSettings.unlimited}
            onQuestionTimesChange={handleQuestionTimesChange}
            timeRemaining={selectedSettings.time_in_minutes * 60}
          />
        ))
      )}
    </>
  );
};

export default App;
