import { CourseRepository } from '../repositories/CourseRepository';

export default class DeleteCourse {
    constructor(private courseRepository: CourseRepository) { }

    async execute(courseId: string) {
        return await this.courseRepository.deleteCourse(courseId);
    }
}
