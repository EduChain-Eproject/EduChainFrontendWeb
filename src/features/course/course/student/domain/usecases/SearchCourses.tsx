import Course from "../entities/Course";
import Page from "../entities/Page";
import { CourseRepository } from "../repositories/CourseRepository";

export class SearchCourses {
    constructor(private courseRepository: CourseRepository) { }

    async execute(params: CourseSearchParams) {
        return this.courseRepository.searchCourses(params);
    }
}

export interface CourseSearchParams {
    search?: string;
    page?: number;
    size?: number;
    sortBy?: string;
    categoryIds?: number[];
}