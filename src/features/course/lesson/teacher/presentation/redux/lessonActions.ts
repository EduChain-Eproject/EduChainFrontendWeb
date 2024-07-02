import { createAsyncThunk } from '@reduxjs/toolkit';
import LessonRepositoryImpl from '../../data/repositoryImpl/LessonRepositoryImpl';
import { GetLessonDetail } from '../../domain/usecases/GetLessonDetail';

const lessonRepository = new LessonRepositoryImpl();

export const fetchLessonDetail = createAsyncThunk(
    'lessons/fetchLessonDetail',
    async (lessonId: number) => {
        const getLessonDetailUseCase = new GetLessonDetail(lessonRepository);
        return await getLessonDetailUseCase.execute(lessonId);
    }
);

