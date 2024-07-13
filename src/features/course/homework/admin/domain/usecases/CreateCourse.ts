import { CourseRepository } from '../repositories/HomeworkRepository';

export default class CreateCourse {
    constructor(private courseRepository: CourseRepository) { }

    async execute(courseData: CreateCourseReq) {
        return await this.courseRepository.createCourse(courseData);
    }
}

export type CreateCourseReq = {
    title: string,
    description: string,
    price: number,
    categoryIds: number[]
}t