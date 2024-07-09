import { ChapterRepository } from "../repositories/ChapterRepository";

export default class CreateChapter {
    constructor(private chapterRepository: ChapterRepository) { }

    async execute(chapterData: CreateChapterReq) {
        return await this.chapterRepository.createChapter(chapterData);
    }
}

export type CreateChapterReq = {
    courseId: number,
    chapterTitle: string
}
