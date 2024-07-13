import Lesson from "../entities/Lesson";
import { LessonRepository } from "../repositories/LessonRepository";

export class DeleteLesson {
    constructor(private lessonRepository: LessonRepository) { }

    async execute(lessonId: number): Promise<{ data?: number; error?: string }> {
        return await this.lessonRepository.deleteLesson(lessonId);
    }
}