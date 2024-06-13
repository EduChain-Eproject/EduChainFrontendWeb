import Course from "../entities/Course";
import { CreateCourseReq } from "../usecases/CreateCourse";
import { UpdateCourseReq } from "../usecases/UpdateCourse";

export interface CourseRepository {
    getCourses: () => Promise<{ data?: Course[]; error?: string }>;
    getCourseDetail: (courseId: string) => Promise<{ data?: Course; error?: string }>;
    createCourse: (courseData: CreateCourseReq) => Promise<{ data?: Course; error?: string }>;
    updateCourse: (courseId: string, courseData: UpdateCourseReq) => Promise<{ data?: Course; error?: string }>;
    deleteCourse: (courseId: string) => Promise<{ data?: void; error?: string }>;
}