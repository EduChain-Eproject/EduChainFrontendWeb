import Course from "./Course";
import { Lesson } from "./Lesson";
import { Question } from "./Question";

export class Homework {
    id: number;
    title: string;
    lesson: Lesson;
    description: string;
    questions: Question[] | undefined;
}