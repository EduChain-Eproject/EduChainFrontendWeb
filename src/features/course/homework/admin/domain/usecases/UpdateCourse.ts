import { CourseRepository } from '../repositories/HomeworkRepository';


export default class UpdateCourse {
    constructor(private courseRepository: CourseRepository) { }

    async execute(courseId: number, courseData: UpdateCourseReq) {
        return await this.courseRepository.updateCourse(courseId, courseData);
    }
}

export type UpdateCourseReq = {
    title: string;
    description: string;
    price: number;
    categoryIds: number[];
};