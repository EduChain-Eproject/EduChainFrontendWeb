import { createAsyncThunk } from '@reduxjs/toolkit';
import CourseRepositoryImpl from '../../data/repositoryImpl/CourseRepositoryImpl';
import {
    GetCourseDetail,
    UpdateCourse,
    CreateCourse,
    GetCourses,
    DeleteCourse,
} from '../../domain/usecases';
import { CourseRepository } from '../../domain/repositories/CourseRepository';
import { CreateCourseReq } from '../../domain/usecases/CreateCourse';

const courseRepository: CourseRepository = new CourseRepositoryImpl();

export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
    const getCoursesUseCase = new GetCourses(courseRepository);
    return await getCoursesUseCase.execute();
});

export const fetchCourseDetail = createAsyncThunk('courses/fetchCourseDetail', async (courseId: string) => {
    const getCourseDetailUseCase = new GetCourseDetail(courseRepository);
    return await getCourseDetailUseCase.execute(courseId);
});

export const createCourse = createAsyncThunk('courses/createCourse', async (courseData: CreateCourseReq) => {
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