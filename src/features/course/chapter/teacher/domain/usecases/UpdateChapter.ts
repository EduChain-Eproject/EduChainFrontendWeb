import { ChapterDTO } from "../../data/models/ChapterDto";
import { ChapterRepository } from "../repositories/ChapterRepository";

export default class UpdateChapter {
    constructor(private chapterRepository: ChapterRepository) { }

    async execute(chapterId: number, chapterData: UpdateChapterReq) {
        return await this.chapterRepository.updateChapter(chapterId, chapterData);
    }
}

export type UpdateChapterReq = {
    chapterTitle: string
}