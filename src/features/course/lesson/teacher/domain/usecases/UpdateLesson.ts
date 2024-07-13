import Lesson from "../entities/Lesson";
import { LessonRepository } from "../repositories/LessonRepository";

export class UpdateLesson {
    constructor(private lessonRepository: LessonRepository) { }

    async execute(lessonId: number, lessonData: UpdateLessonReq): Promise<{ data?: Lesson; error?: string }> {
        return await this.lessonRepository.updateLesson(lessonId, lessonData);
    }
}

export type UpdateLessonReq = {
    lessonTitle: string;
    description: string;
    videoTitle: string;
    file: FileList;
}