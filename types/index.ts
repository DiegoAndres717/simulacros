import {
  ChangeEventHandler,
  MouseEventHandler,
  Dispatch,
  SetStateAction,
  ChangeEvent,
} from "react";
import { VIEWTYPE } from "../constants/index";

export interface Question {
  id: number;
  statement: string;
  options: {
    id: string,
    label: string
  }[];  
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
  setUserAnswers: (value: Answer[]) => void
  userAnswers: Answer[];
  timeRemaining: number;
  isTimeUnlimited: boolean
}

export interface SimulationsProps {
  selectedBasicArea: string[];
  selectedSpecialties: string[];
  timeQuestions: number;
  formErrors: FormErrors
  setFormErrors: Dispatch<SetStateAction<FormErrors>>
  onButtonClick: () => void;
  setSelectedSpecialties: Dispatch<SetStateAction<string[]>>;
  setSelectedBasicArea: Dispatch<SetStateAction<string[]>>;
  handleTimeQuestionsChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleTimeUnlimitedChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface FormErrors {
  numQuestions?: boolean;
  timeQuestions?: boolean;
  checkSpecialties?: boolean;
  checkBasicArea?: boolean
  nameQuestions?: boolean
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
  min?: number;
  max?: number;
}

export interface ValidationRules {
  min?: number;
  max?: number;
}

export interface Option {
  [key: string]: string
}

export interface Specialties {
  title: string;
  minimum?: number;
  options: Option[];
  type: "checkbox";
}

export interface BasicArea {
  title: string;
  minimum?: number;
  options: Option[];
  type: "checkbox";
}

export interface GeneralCulture {
  title: string;
  minimum?: number;
  options: Option[];
  type: "checkbox";
}

export interface NumQuestions {
  title: string;
  minimum?: number;
  maximum?: number;
  type: "number";
}

export interface TimeMinutes {
  title: string;
  minimum?: number;
  type: "number";
}

export interface NameSimulation {
  title: string;
  defaultValue: string;
  type: "text";
}

export interface DataSettings {
  specialties: Specialties;
  basicArea: BasicArea;
  generalCulture: GeneralCulture;
  numQuestions: NumQuestions;
  timeMinutes: TimeMinutes;
  nameSimulation: NameSimulation;
}

export interface Results {
  score: number
  total: number
  correct: number
  questions: ResultsQuestion[]
}

export interface ResultsQuestion {
  id: number
  statement: string
  specialty: string
  type: string
  justification: string
  bibliography: string
  is_correct: boolean
}

export interface SelectedSettings {
  basic_areas?: number[];
  specialties?: number[];
  general_culture?: boolean;
  number_of_questions: number;
  name: string;
  time_in_minutes: number;
  unlimited: boolean;
}

export interface Answer {
  index: number
  questionId: number
  answerId: string
  timeToAnswerInSeconds?: string
  report?: { [key: number]: boolean | undefined };
}