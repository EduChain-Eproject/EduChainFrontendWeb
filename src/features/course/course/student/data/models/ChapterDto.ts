import { CourseDTO } from "../../../../chapter/teacher/data/models/CourseDto";
import { LessonDTO } from "../../../../chapter/teacher/data/models/LessonDto";

export class ChapterDTO {
    id: number;
    chapterTitle: string;
    courseDto: CourseDTO | undefined;
    lessonDtos: LessonDTO[] | undefined;
}