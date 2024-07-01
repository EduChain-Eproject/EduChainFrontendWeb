import { CategoryDto } from "./CategoryDto";
import { ChapterDto } from "./ChapterDto";

export class CourseDto {
    id: number;
    title: string;
    description: string;
    price: number;
    status: string;

    categoryDtos: CategoryDto[] | undefined;
    chapterDtos: ChapterDto[] | undefined
}