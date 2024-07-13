import { CourseRepository } from '../repositories/HomeworkRepository';

export default class GetCourseDetail {
    constructor(private courseRepository: CourseRepository) { }

    async execute(courseId: number) {
        return await this.courseRepository.getCourseDetail(courseId);
    }
}
