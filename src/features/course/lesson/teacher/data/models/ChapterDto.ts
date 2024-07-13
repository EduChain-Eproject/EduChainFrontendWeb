import { LessonDTO } from "./LessonDto";
import { CourseDTO } from "./CourseDto";


export class ChapterDTO {
    id: number;
    chapterTitle: string;
    courseDto: CourseDTO | undefined;
    lessonDtos: LessonDTO[] | undefined;
}