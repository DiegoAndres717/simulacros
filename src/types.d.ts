
export interface Question {
    statement: string;
    options: string[];
    correct_answer: number;
    specialties: string;
    basic_areas: string;
}

type CurrentViewType = 'QuestionBank' | 'Simulations' | 'Results' | 'Questions'

export type ListQuestion = Question[]