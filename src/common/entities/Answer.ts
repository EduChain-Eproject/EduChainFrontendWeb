import Course from "./Course";
import { Lesson } from "./Lesson";
import { Question } from "./Question";

export class Answer {
    id: number;
    answerText: string;
    question: Question;
}