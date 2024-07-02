import { ChapterDTO } from "./ChapterDto";

export class CourseDTO {
    id: number;
    title: string;
    description: string;
    price: number;
    status: string;

    chapterDtos: ChapterDTO[] | undefined
}