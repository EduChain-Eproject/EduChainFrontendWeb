import Course from "./Course";
import { Lesson } from "./Lesson";

export class Chapter {
    id: number;
    chapterTitle: string;
    course: Course
    lessons: Lesson[] | undefined
}