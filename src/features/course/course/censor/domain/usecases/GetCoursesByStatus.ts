import Course from "../entities/Course";
import Page from "../entities/Page";
import { CourseRepository } from "../repositories/CourseRepository";

export default class GetCoursesByStatus {
    constructor(private courseRepository: CourseRepository) { }

    async execute(
        request: GetCoursesByStatusRequest
    ): Promise<{ data?: Page<Course>; error?: string }> {
        return await this.courseRepository.getCoursesByStatus(request);
    }
}

export enum CourseStatusForCensor {
    APPROVED = 'APPROVED',
    UNDER_REVIEW = 'UNDER_REVIEW',
    DELETED = 'DELETED',
    ALL = 'ALL'
}

export type GetCoursesByStatusRequest = {
    censorId: number;
    search: string;
    page: number;
    size: number;
    sortBy: string;

    status: CourseStatusForCensor | null;
}