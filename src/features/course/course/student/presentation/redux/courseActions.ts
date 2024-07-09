import { createAsyncThunk } from '@reduxjs/toolkit';
import { CourseSearchParams, SearchCourses } from '../../domain/usecases/SearchCourses';
import CourseRepositoryImpl from '../../data/repositoryImpl/CourseRepositoryImpl';
import CategoryRepositoryImpl from '../../data/repositoryImpl/CategoryRepositoryImpl';
import GetListCategories from '../../domain/usecases/GetListCategories';
import { FetchCourseDetailUseCase } from '../../domain/usecases/FetchCourseDetailUseCase'
import LessonRepositoryImpl from '../../../../lesson/teacher/data/repositoryImpl/LessonRepositoryImpl';
import { GetLessonDetail } from '../../domain/usecases/GetLessonDetail'

const courseRepository = new CourseRepositoryImpl();
const categoryRepository = new CategoryRepositoryImpl();
const lessonRepository = new LessonRepositoryImpl()

export const fetchListCategories = createAsyncThunk('courses/fetchListCategories', async () => {
    const getListCateoriesUseCase = new GetListCategories(categoryRepository);
    return await getListCateoriesUseCase.execute();
});

export const searchCourses = createAsyncThunk(
    'courses/searchCourses',
    async (params: CourseSearchParams) => {
        const searchCoursesUseCase = new SearchCourses(courseRepository);
        return await searchCoursesUseCase.execute(params);
    }
);

export const fetchCourseDetail = createAsyncThunk(
    'courses/fetchCourseDetail',
    async (courseId: number) => {
        const fetchCourseDetailUseCase = new FetchCourseDetailUseCase(courseRepository);
        return fetchCourseDetailUseCase.execute(courseId);
    }
);

export const fetchLessonDetail = createAsyncThunk(
    'lessons/fetchLessonDetail',
    async (lessonId: number) => {
        const getLessonDetailUseCase = new GetLessonDetail(lessonRepository);
        return await getLessonDetailUseCase.execute(lessonId);
    }
);