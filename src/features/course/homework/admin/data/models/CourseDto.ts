import { CategoryDto } from "./CategoryDto";
import { ChapterDTO } from "./ChapterDto";

export class CourseDto {
    id: number;
    title: string;
    description: string;
    price: number;
    status: string;

    categoryDtos: CategoryDto[] | undefined;
    chapterDtos: ChapterDTO[] | undefined
}