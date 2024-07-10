import Homework from "../entities/Homework";
import Course from "../entities/Lesson";
import { CreateCourseReq } from "../usecases/CreateCourse";
import { GetCoursesByTeacherRequest } from "../usecases/GetCoursesByTeacher";
import { UpdateCourseReq } from "../usecases/UpdateCourse";

export interface HomeworkRepository {
    getHomework: (homeworkId: number) => Promise<{ data?: Homework; error?: string }>;

    // getHomeworks(
    //     request: GetCoursesByTeacherRequest
    // ): Promise<{ data?: Course[]; error?: string }>;

    createHomework: (
        courseData: CreateCourseReq
    ) => Promise<{ data?: Course; error?: string }>;

    updateHomework: (
        courseId: number,
        courseData: UpdateCourseReq
    ) => Promise<{ data?: Course; error?: string }>;

    deleteHomework: (cateId: number) => Promise<{ data?: void; error?: string }>;


}