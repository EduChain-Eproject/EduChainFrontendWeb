import { CourseDto } from "./CourseDto";

export class CourseFeedbackDto {
    id: number;
    message: string;

    course: CourseDto | undefined
}