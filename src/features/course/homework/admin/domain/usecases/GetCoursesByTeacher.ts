import Course from "../entities/Lesson";
import { CourseRepository } from "../repositories/HomeworkRepository";

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