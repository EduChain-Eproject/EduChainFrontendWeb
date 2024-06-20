import { CourseDto } from "./CourseDto";

export class CategoryDto {
    categoryName: string;
    courseDtos: CourseDto[] | undefined
}