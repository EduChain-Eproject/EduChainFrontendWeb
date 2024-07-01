import Course from "../entities/Course";
import { CreateCourseReq } from "../usecases/CreateCourse";
import { GetCoursesByTeacherRequest } from "../usecases/GetCoursesByTeacher";
import { UpdateCourseReq } from "../usecases/UpdateCourse";

export interface CourseRepository {
    getCourseDetail: (courseId: number) => Promise<{ data?: Course; error?: string }>;

    getCoursesByTeacher(
        request: GetCoursesByTeacherRequest
    ): Promise<{ data?: Course[]; error?: string }>;

    createCourse: (
        courseData: CreateCourseReq
    ) => Promise<{ data?: Course; error?: string }>;

    updateCourse: (
        courseId: number,
        courseData: UpdateCourseReq
    ) => Promise<{ data?: Course; error?: string }>;

    deactivateCourse: (courseId: number) => Promise<{ data?: boolean; error?: string }>;

}