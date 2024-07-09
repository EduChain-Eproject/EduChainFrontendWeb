import { ChapterRepository } from "../repositories/ChapterRepository";

export default class DeleteChapter {
    constructor(private chapterRepository: ChapterRepository) { }

    async execute(chapterId: number) {
        return await this.chapterRepository.deleteChapter(chapterId);
    }
}
