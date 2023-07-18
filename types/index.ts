import {
  ChangeEventHandler,
  MouseEventHandler,
  Dispatch,
  SetStateAction,
  ChangeEvent,
} from "react";
import { VIEWTYPE } from "../constants/index";

export interface Question {
  statement: string;
  options: string[];
  correct_answer: number;
  specialties: string;
  basic_areas: string;
}
export type ListQuestion = Question[];

export type CurrentViewType = keyof typeof VIEWTYPE;

export interface SelectableItem {
  name: string;
}

export interface QuestionsProps {
  questionList: ListQuestion;
  onFinish: () => void;
  onQuestionTimesChange: (questionTimes: number[]) => void;
  onAnswer: (answer: number, index: number) => void;
  userAnswers: number[];
  timeRemaining: number;
}

export interface SimulationsProps {
  questionList: ListQuestion;
  selectedBasicArea: string[];
  selectedSpecialties: string[];
  timeQuestions: number;
  onButtonClick: () => void;
  setSelectedSpecialties: Dispatch<SetStateAction<string[]>>;
  setSelectedBasicArea: Dispatch<SetStateAction<string[]>>;
  handleTimeQuestionsChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface CustomButtonProps {
  isDisabled?: boolean;
  btnType?: "button" | "submit";
  containerStyles?: string;
  textStyles?: string;
  title: string;
  icon?: React.ReactNode;
  iconPosition?: "before" | "after";
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface CustomInputProps {
  inputType: "number" | "text" | "checkbox";
  titleLabel?: string;
  styleLabel?: string;
  labelPosition?: "before" | "after";
  value?: string | number;
  isChecked?: boolean;
  handleChange?: ChangeEventHandler<HTMLInputElement>;
  inputStyle?: string;
  min?: string;
  max?: string;
}
