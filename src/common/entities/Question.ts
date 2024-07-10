import { Answer } from "./Answer";
import Course from "./Course";
import { Homework } from "./Homework";
import { Lesson } from "./Lesson";

export class Question {
    id: number;
    questionText: string;
    homework: Homework;
    answers: Answer[] | undefined;
    correctAnswer: number;
}