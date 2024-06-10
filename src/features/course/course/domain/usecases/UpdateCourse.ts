import { CourseRepository } from '../repositories/CourseRepository';

export default class UpdateCourse {
    constructor(private courseRepository: CourseRepository) { }

    async execute(courseId: string, courseData: UpdateCourseReq) {
        return await this.courseRepository.updateCourse(courseId, courseData);
    }
}

export type UpdateCourseReq = {

}