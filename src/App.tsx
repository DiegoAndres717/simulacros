import { ChangeEvent, useState } from "react";
import QuestionBank from "./components/QuestionBank";
import Questions from "./components/Questions";
import Simulations from "./components/Simulations";
import Results from "./components/Results ";
import { CurrentViewType, Question } from "../types";

const App = () => {
  const [questionList, setQuestionList] = useState<Array<Question>>([]);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [questionTimes, setQuestionTimes] = useState<number[]>([]);
  const [currentView, setCurrentView] =
    useState<CurrentViewType>("questionBank");
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedBasicArea, setSelectedBasicArea] = useState<string[]>([]);
  const [timeQuestions, setTimeQuestions] = useState(0);

  const filteredQuestions = questionList.filter(
    (question) =>
      selectedSpecialties.includes(question.specialties) &&
      selectedBasicArea.includes(question.basic_areas)
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
    console.log(selectedBasicArea, selectedSpecialties,timeQuestions);
    fetch('./data/questions.json', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
          basic_areas: selectedBasicArea,
          specialties: selectedSpecialties,
          time: timeQuestions
      })
    }).then(response => response.json()).then(data => {
      setQuestionList(data);
      setCurrentView('questions');
    });
};

  return (
    <>
      {currentView === "questionBank" && (
        <QuestionBank onButtonClick={() => setCurrentView("simulations")} />
      )}
      {currentView === "simulations" && (
        <Simulations
          questionList={filteredQuestions}
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
          questionList={filteredQuestions}
          questionTimes={questionTimes}
          setSelectedSpecialties={setSelectedSpecialties}
          setSelectedBasicArea={setSelectedBasicArea}
          setTimeQuestions={setTimeQuestions}
          onButtonClick={() => setCurrentView("questionBank")}
        />
      ) : (
        currentView === "questions" &&
        (filteredQuestions.length === 0 ? (
          <p>
            No hay preguntas que coincidan con las especialidades y áreas
            básicas seleccionadas.
          </p>
        ) : (
          <Questions
            userAnswers={userAnswers}
            onAnswer={handleAnswer}
            questionList={filteredQuestions}
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
