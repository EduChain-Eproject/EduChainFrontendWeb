import Course from "../entities/Course";
import Page from "../entities/Page";
import { ChangeCourseStatusRequest } from "../usecases/DeactivateCourse";
import { GetCoursesByStatusRequest } from "../usecases/GetCoursesByStatus";

export interface CourseRepository {
    getCourseDetail: (courseId: number) => Promise<{ data?: Course; error?: string }>;

    getCoursesByStatus(
        request: GetCoursesByStatusRequest
    ): Promise<{ data?: Page<Course>; error?: string }>;

    changeStatusOfCourse: (req: ChangeCourseStatusRequest) => Promise<{ data?: Course; error?: string }>;

}