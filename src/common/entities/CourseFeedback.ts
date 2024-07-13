import { Category } from "./Category";
import { Chapter } from "./Chapter";
import Course from "./Course";

export default class CourseFeedback {
    id: number;
    message: string;

    course: Course | undefined
    // user: User | undefined
}