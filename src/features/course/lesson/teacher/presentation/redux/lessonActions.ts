import { createAsyncThunk } from '@reduxjs/toolkit';
import LessonRepositoryImpl from '../../data/repositoryImpl/LessonRepositoryImpl';
import { GetLessonDetail } from '../../domain/usecases/GetLessonDetail';
import Lesson from '../../domain/entities/Lesson';
import { UpdateLesson, UpdateLessonReq } from '../../domain/usecases/UpdateLesson'
import { CreateLesson, CreateLessonReq } from '../../domain/usecases/CreateLesson';
import { DeleteLesson } from '../../domain/usecases/DeleteLesson';

const lessonRepository = new LessonRepositoryImpl();

export const fetchLessonDetail = createAsyncThunk(
    'lessons/fetchLessonDetail',
    async (lessonId: number) => {
        const getLessonDetailUseCase = new GetLessonDetail(lessonRepository);
        return await getLessonDetailUseCase.execute(lessonId);
    }
);

export const updateLesson = createAsyncThunk(
    'lessons/updateLesson',
    async ({ lessonId, lessonData }: { lessonId: number; lessonData: UpdateLessonReq }) => {
        const updateLessonUseCase = new UpdateLesson(lessonRepository);
        return await updateLessonUseCase.execute(lessonId, lessonData);
    }
);

export const createLesson = createAsyncThunk(
    'lessons/createLesson',
    async ({ lessonData }: { lessonData: CreateLessonReq }) => {
        const createLessonUseCase = new CreateLesson(lessonRepository);
        return await createLessonUseCase.execute(lessonData);
    }
);

export const deleteLesson = createAsyncThunk(
    'lessons/deleteLesson',
    async (lessonId: number) => {
        const deleteLessonUseCase = new DeleteLesson(lessonRepository);
        return await deleteLessonUseCase.execute(lessonId);
    }
);
