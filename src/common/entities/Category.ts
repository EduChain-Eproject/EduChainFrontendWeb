import Course from "./Course";

export default class Category {
    id: number;
    categoryName: string;
    courses: Course[];
    description: string;
}