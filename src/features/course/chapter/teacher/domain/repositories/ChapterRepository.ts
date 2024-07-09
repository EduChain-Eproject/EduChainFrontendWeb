import Chapter from "../entities/Chapter";
import { CreateChapterReq } from "../usecases/CreateChapter";
import { UpdateChapterReq } from "../usecases/UpdateChapter";

export interface ChapterRepository {
    getChapterDetail: (chapterId: number) => Promise<{ data?: Chapter; error?: string }>;

    updateChapter: (chapterId: number, chapterData: UpdateChapterReq) => Promise<{ data?: Chapter; error?: string }>;

    deleteChapter: (chapterId: number) => Promise<{ data?: number; error?: string }>;

    createChapter: (chapterData: CreateChapterReq) => Promise<{ data?: Chapter; error?: string }>;
}
