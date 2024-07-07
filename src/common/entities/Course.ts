import { Category } from "./Category";
import { Chapter } from "./Chapter";
import CourseFeedback from './CourseFeedback';

export default class Course {
    id: number;
    price: number;
    title: string;
    description: string;
    status: string;

    categories: Category[] | undefined
    chapters: Chapter[] | undefined

    numberOfEnrolledStudents: number | undefined
    courseFeedbacks: CourseFeedback[] | undefined

    relatedCourses: Course[] | undefined
}