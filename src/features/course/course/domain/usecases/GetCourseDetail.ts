import { CourseRepository } from '../repositories/CourseRepository';

export default class GetCourseDetail {
    constructor(private courseRepository: CourseRepository) { }

    async execute(courseId: string) {
        return await this.courseRepository.getCourseDetail(courseId);
    }
}
