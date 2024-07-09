import Lesson from "../entities/Lesson";
import { CreateLessonReq } from "../usecases/CreateLesson";
import { UpdateLessonReq } from "../usecases/UpdateLesson";

export interface LessonRepository {
    getLessonDetail: (lessonId: number) => Promise<{ data?: Lesson; error?: string }>;
    updateLesson: (lessonId: number, lessonData: UpdateLessonReq) => Promise<{ data?: Lesson; error?: string }>;
    createLesson: (lessonData: CreateLessonReq) => Promise<{ data?: Lesson; error?: string }>;
    deleteLesson: (lessonId: number) => Promise<{ data?: number; error?: string }>;
}
