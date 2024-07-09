import { CourseRepository } from '../repositories/CourseRepository';
import { CourseStatusForCensor } from './GetCoursesByStatus';

export default class DeactivateCourse {
    constructor(private courseRepository: CourseRepository) { }

    async execute(req: ChangeCourseStatusRequest) {
        return await this.courseRepository.changeStatusOfCourse(req);
    }
}


export type ChangeCourseStatusRequest = {
    courseId: number;
    status: CourseStatusForCensor;
}