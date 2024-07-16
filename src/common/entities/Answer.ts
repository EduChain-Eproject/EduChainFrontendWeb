import Course from "./Course";
import { Lesson } from "./Lesson";
import { Question } from "./Question";
import { UserAnswer } from "./UserAnswer";

export class Answer {
    id: number;
    answerText: string;
    question: Question;
    userAnswers: UserAnswer[];

    constructor(answerText: string) {
        this.answerText = answerText;
    }
}