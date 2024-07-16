import Course from "./Course";
import { Lesson } from "./Lesson";
import { Question } from "./Question";
import { UserAnswer } from "./UserAnswer";
import { UserHomework } from "./UserHomework";
import { Award } from "./Award";

export class Homework {
    id: number;
    title: string;
    lesson: Lesson;
    description: string;
    questions: Question[] | undefined;
    userAnswers: UserAnswer[]| undefined;
    userHomeworks: UserHomework[]| undefined;
    userAwards: Award[]| undefined;
}