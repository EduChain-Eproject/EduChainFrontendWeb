import { CourseDto } from "./CourseDto";

export class CategoryDto {
    id: number;
    categoryName: string;
    courseDtos: CourseDto[] | undefined
}