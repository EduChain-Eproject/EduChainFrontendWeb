import { CourseRepository } from '../repositories/CourseRepository';

export default class DeactivateCourse {
    constructor(private courseRepository: CourseRepository) { }

    async execute(courseId: number) {
        return await this.courseRepository.deactivateCourse(courseId);
    }
}
