import { LessonRepository } from "../../domain/repositories/LessonRepository";
import Lesson from "../entities/Lesson";

export class GetLessonDetail {
    constructor(private lessonRepository: LessonRepository) { }

    async execute(lessonId: number): Promise<{ data?: Lesson; error?: string }> {
        return await this.lessonRepository.getLessonDetail(lessonId);
    }
}
