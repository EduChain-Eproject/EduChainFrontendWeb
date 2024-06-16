import { CourseRepository } from '../repositories/CourseRepository';

export default class CreateCourse {
    constructor(private courseRepository: CourseRepository) { }

    async execute(courseData: CreateCourseReq) {
        return await this.courseRepository.createCourse(courseData);
    }
}

export type CreateCourseReq = {
    
}