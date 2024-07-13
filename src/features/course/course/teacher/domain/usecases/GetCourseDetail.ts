import { CourseRepository } from '../repositories/CourseRepository';

export default class GetCourseDetail {
    constructor(private courseRepository: CourseRepository) { }

    async execute(courseId: number) {
        return await this.courseRepository.getCourseDetail(courseId);
    }
}
