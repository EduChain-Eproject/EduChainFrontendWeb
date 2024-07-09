import Course from "../entities/Course";
import { CourseRepository } from "../repositories/CourseRepository";

export default class GetCoursesByTeacher {
    constructor(private courseRepository: CourseRepository) { }

    async execute(
        request: GetCoursesByTeacherRequest
    ): Promise<{ data?: Course[]; error?: string }> {
        return await this.courseRepository.getCoursesByTeacher(request);
    }
}

export type GetCoursesByTeacherRequest = {
    teacherId: number;
    search: string;
    page: number;
    size: number;
    sortBy: string;
}