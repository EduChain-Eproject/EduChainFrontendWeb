import { CategoryDto } from "./CategoryDto";
import { ChapterDTO } from "./ChapterDto";
import { CourseFeedbackDto } from './CourseFeedbackDto'
export class CourseDto {
    id: number;
    title: string;
    description: string;
    price: number;
    status: string;

    categoryDtos: CategoryDto[] | undefined;
    chapterDtos: ChapterDTO[] | undefined;
    numberOfEnrolledStudents: number | undefined;
    // teacherDto: UserDto | undefined
    // participatedUserDtos:  UserDto[] | undefined
    courseFeedbackDtos: CourseFeedbackDto[] | undefined
    relatedCourseDtos: CourseDto[] | undefined

    enrolled?: boolean
}