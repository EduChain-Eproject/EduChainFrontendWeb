import { ChapterDTO } from "./ChapterDto";

export class LessonDTO {
    id: number;
    lessonTitle: string;
    description: string;
    videoTitle: string;
    videoURL: string;
    chapterDto: ChapterDTO | undefined;
}