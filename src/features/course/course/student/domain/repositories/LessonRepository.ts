import Lesson from "../entities/Lesson";

export interface LessonRepository {
    getLessonDetail: (lessonId: number) => Promise<{ data?: Lesson; error?: string }>;
}