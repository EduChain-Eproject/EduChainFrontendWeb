import Lesson from "../entities/Lesson";
import { LessonRepository } from "../repositories/LessonRepository";

export class CreateLesson {
    constructor(private lessonRepository: LessonRepository) { }

    async execute(lessonData: CreateLessonReq): Promise<{ data?: Lesson; error?: string }> {
        return await this.lessonRepository.createLesson(lessonData);
    }
}

export type CreateLessonReq = {
    chapterId: string;
    lessonTitle: string;
    description: string;
    videoTitle: string;
    file: FileList;
}