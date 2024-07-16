import { User } from "./User";
import { Homework } from "./Homework";
import { Question } from "./Question";
import { Answer } from "./Answer";

export class UserAnswer {
    id: number;
    user: User | undefined;
    homework: Homework | undefined;
    question: Question | undefined;
    answer: Answer | undefined;
    isCorrect: boolean;
}