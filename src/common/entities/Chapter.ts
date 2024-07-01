import Course from "./Course";
import { Lesson } from "./Lesson";

export class Chapter {
    id: number;
    chapterTitle: string;
    courses: Course
    lessons: Lesson[] | undefined
}