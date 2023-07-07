import { useState } from 'react';
import QuestionBank from "./components/QuestionBank";
import Questions from "./components/Questions";
import Simulations from "./components/Simulations";
import { questions } from "../data";
import type { CurrentViewType, Question } from "./types";
import Results from "./components/Results ";

const App = (): JSX.Element => {
  const [questionList] = useState<Array<Question>>(questions);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [questionTimes, setQuestionTimes] = useState<number[]>([]);
  const [currentView, setCurrentView] = useState<CurrentViewType>('QuestionBank');

  const handleAnswer = (answer: number, index: number): void => {
    setUserAnswers([
      ...userAnswers.slice(0, index),
      answer,
      ...userAnswers.slice(index + 1),
    ]);
  };

  const handleFinish = (): void => {
    setCurrentView('Results');
  };

  const handleQuestionTimesChange = (newQuestionTimes: number[]): void => {
    setQuestionTimes(newQuestionTimes);
  };

  return (
    <>
      {currentView === 'QuestionBank' && <QuestionBank onButtonClick={(): void => setCurrentView('Simulations')} />}
      {currentView === 'Simulations' && <Simulations onButtonClick={(): void => setCurrentView('Questions')}/>}
      {currentView === 'Results' ? (
        <Results
          userAnswers={userAnswers}
          questionList={questionList}
          questionTimes={questionTimes}
          onButtonClick={() => setCurrentView('QuestionBank')}
        />
      ) : (
        currentView === 'Questions' && <Questions
          userAnswers={userAnswers}
          onAnswer={handleAnswer}
          questionList={questionList}
          onFinish={handleFinish}
          onQuestionTimesChange={handleQuestionTimesChange}
        />
      )}

    </>
  );
};

export default App;
