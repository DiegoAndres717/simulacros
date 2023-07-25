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
  options: {
    [key: string]: string
  };
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
  selectedBasicArea: string[];
  selectedSpecialties: string[];
  timeQuestions: number;
  formErrors: FormErrors
  setFormErrors: Dispatch<SetStateAction<FormErrors>>
  onButtonClick: () => void;
  setSelectedSpecialties: Dispatch<SetStateAction<string[]>>;
  setSelectedBasicArea: Dispatch<SetStateAction<string[]>>;
  handleTimeQuestionsChange: (event: ChangeEvent<HTMLInputElement>) => void;
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
