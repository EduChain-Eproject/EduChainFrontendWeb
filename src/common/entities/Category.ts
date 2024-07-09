import Course from "./Course";

export class Category {
    id: number;
    categoryName: string;
    courses: Course[];
    description: string;
}