import Course from "../entities/Course";
import Page from "../entities/Page";
import { CourseSearchParams } from "../usecases/SearchCourses";

export interface CourseRepository {
    searchCourses: (params: CourseSearchParams) => Promise<{ data?: Page<Course>; error?: string }>;
    getCourseDetail(courseId: number): Promise<{ data?: Course; error?: string }>;
}