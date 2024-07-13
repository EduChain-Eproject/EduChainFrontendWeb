import { createAsyncThunk } from '@reduxjs/toolkit';
import CourseRepositoryImpl from '../../../teacher/data/repositoryImpl/CourseRepositoryImpl';
import {
    GetCourseDetail,
    UpdateCourse,
    CreateCourse,
    DeactivateCourse,
    GetListCategories,
} from '../../domain/usecases';
import CategoryRepositoryImpl from '../../data/repositoryImpl/CategoryRepositoryImpl';
import { CreateCourseReq } from '../../domain/usecases/CreateCourse';
import GetCoursesByTeacher, { GetCoursesByTeacherRequest } from '../../domain/usecases/GetCoursesByTeacher';

const courseRepository = new CourseRepositoryImpl();
const categoryRepository = new CategoryRepositoryImpl();

export const fetchListCategories = createAsyncThunk('courses/fetchListCategories', async () => {
    const getListCateoriesUseCase = new GetListCategories(categoryRepository);
    return await getListCateoriesUseCase.execute();
});

export const fetchCourseDetail = createAsyncThunk('courses/fetchCourseDetail', async (courseId: number) => {
    const getCourseDetailUseCase = new GetCourseDetail(courseRepository);
    return await getCourseDetailUseCase.execute(courseId);
});

export const createCourse = createAsyncThunk('courses/createCourse', async (courseData: CreateCourseReq) => {
    const createCourseUseCase = new CreateCourse(courseRepository);
    return await createCourseUseCase.execute(courseData);
});

export const updateCourse = createAsyncThunk('courses/updateCourse', async ({ courseId, courseData }: { courseId: number, courseData: any }) => {
    const updateCourseUseCase = new UpdateCourse(courseRepository);
    return await updateCourseUseCase.execute(courseId, courseData);
});

export const deactivateCourse = createAsyncThunk('courses/DeactivateCourse', async (courseId: number) => {
    const DeactivateCourseUseCase = new DeactivateCourse(courseRepository);
    return await DeactivateCourseUseCase.execute(courseId);
});


export const fetchCoursesByTeacher = createAsyncThunk(
    'courses/fetchCoursesByTeacher',
    async (request: GetCoursesByTeacherRequest) => {
        const getCoursesByTeacher = new GetCoursesByTeacher(courseRepository);
        return await getCoursesByTeacher.execute(request);
    }
);