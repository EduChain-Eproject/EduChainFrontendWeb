import { CourseRepository } from "../repositories/CourseRepository";

export default class GetCourses {
    constructor(private courseRepository: CourseRepository) { }

    async execute() {
        return await this.courseRepository.getCourses();
    }
}