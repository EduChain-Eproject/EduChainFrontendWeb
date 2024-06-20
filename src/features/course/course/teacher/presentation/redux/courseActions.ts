import { createAsyncThunk } from '@reduxjs/toolkit';
import CourseRepositoryImpl from '../../../teacher/data/repositoryImpl/CourseRepositoryImpl';
import {
    GetCourseDetail,
    UpdateCourse,
    CreateCourse,
    GetCourses,
    DeleteCourse,
    GetListCategories,
} from '../../domain/usecases';
import CategoryRepositoryImpl from '../../data/repositoryImpl/CategoryRepositoryImpl';

const courseRepository = new CourseRepositoryImpl();
const categoryRepository = new CategoryRepositoryImpl();

export const fetchListCategories = createAsyncThunk('courses/fetchListCategories', async () => {
    const getListCateoriesUseCase = new GetListCategories(categoryRepository);
    return await getListCateoriesUseCase.execute();
});

export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
    const getCoursesUseCase = new GetCourses(courseRepository);
    return await getCoursesUseCase.execute();
});

export const fetchCourseDetail = createAsyncThunk('courses/fetchCourseDetail', async (courseId: string) => {
    const getCourseDetailUseCase = new GetCourseDetail(courseRepository);
    return await getCourseDetailUseCase.execute(courseId);
});

export const createCourse = createAsyncThunk('courses/createCourse', async (courseData: any) => {
    const createCourseUseCase = new CreateCourse(courseRepository);
    return await createCourseUseCase.execute(courseData);
});

export const updateCourse = createAsyncThunk('courses/updateCourse', async ({ courseId, courseData }: { courseId: string, courseData: any }) => {
    const updateCourseUseCase = new UpdateCourse(courseRepository);
    return await updateCourseUseCase.execute(courseId, courseData);
});

export const deleteCourse = createAsyncThunk('courses/deleteCourse', async (courseId: string) => {
    const deleteCourseUseCase = new DeleteCourse(courseRepository);
    return await deleteCourseUseCase.execute(courseId);
});