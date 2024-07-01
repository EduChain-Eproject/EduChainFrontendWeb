import { Category } from "./Category";
import { Chapter } from "./Chapter";

export default class Course {
    id: number;
    price: number;
    title: string;
    description: string;
    status: string;

    categories: Category[] | undefined
    chapters: Chapter[] | undefined
}