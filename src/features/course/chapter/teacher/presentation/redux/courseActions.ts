import { createAsyncThunk } from '@reduxjs/toolkit';
import ChapterRepositoryImpl from '../../data/repositoryImpl/ChapterRepositoryImpl';

import GetChapterDetail from '../../domain/usecases/GetChapterDetail'
import { ChapterDTO } from '../../data/models/ChapterDto';
import UpdateChapter, { UpdateChapterReq } from '../../domain/usecases/UpdateChapter';
import DeleteChapter from '../../domain/usecases/DeleteChapter';
import CreateChapter, { CreateChapterReq } from '../../domain/usecases/CreateChapter';

const chapterRepository = new ChapterRepositoryImpl();

export const getChapterDetail = createAsyncThunk('chapters/getChapterDetail', async (chapterId: number) => {
    const getChapterDetailUseCase = new GetChapterDetail(chapterRepository);
    return await getChapterDetailUseCase.execute(chapterId);
});

export const updateChapter = createAsyncThunk('chapters/updateChapter', async ({ chapterId, chapterData }: { chapterId: number, chapterData: UpdateChapterReq }) => {
    const updateChapterUseCase = new UpdateChapter(chapterRepository);
    return await updateChapterUseCase.execute(chapterId, chapterData);
});

export const deleteChapter = createAsyncThunk('chapters/deleteChapter', async (chapterId: number) => {
    const deleteChapterUseCase = new DeleteChapter(chapterRepository);
    return await deleteChapterUseCase.execute(chapterId);
});

export const createChapter = createAsyncThunk('chapters/createChapter', async (chapterData: CreateChapterReq) => {
    const createChapterUseCase = new CreateChapter(chapterRepository);
    return await createChapterUseCase.execute(chapterData);
});
