import { ChapterRepository } from "../repositories/ChapterRepository";

export default class GetChapterDetail {
    constructor(private chapterRepository: ChapterRepository) { }

    async execute(chapterId: number) {
        return await this.chapterRepository.getChapterDetail(chapterId);
    }
}
