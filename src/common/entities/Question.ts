import { Answer } from "./Answer";
import { Homework } from "./Homework";
import { UserAnswer } from "./UserAnswer";

export class Question {
    id: number;
    questionText: string;
    homework: Homework | undefined;
    answers: Answer[]  | undefined;
    userAnswers: UserAnswer[] | undefined;
    correctAnswer: Answer | undefined;

}