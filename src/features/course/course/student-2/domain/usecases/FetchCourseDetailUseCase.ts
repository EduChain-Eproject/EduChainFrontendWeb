import Course from '../entities/Course';
import { CourseRepository } from '../repositories/CourseRepository';

export class FetchCourseDetailUseCase {
    private courseRepository: CourseRepository;

    constructor(courseRepository: CourseRepository) {
        this.courseRepository = courseRepository;
    }

    async execute(courseId: number): Promise<{ data?: Course; error?: string }> {
        return await this.courseRepository.getCourseDetail(courseId);
    }
}
