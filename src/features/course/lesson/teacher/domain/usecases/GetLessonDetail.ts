import { Lesson } from "../../../../../../common/entities/Lesson";
import { LessonRepository } from "../repositories/LessonRepository";

export class GetLessonDetail {
    constructor(private lessonRepository: LessonRepository) { }

    async execute(lessonId: number): Promise<{ data?: Lesson; error?: string }> {
        return await this.lessonRepository.getLessonDetail(lessonId);
    }
}
