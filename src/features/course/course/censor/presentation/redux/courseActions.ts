import { createAsyncThunk } from '@reduxjs/toolkit';
import CourseRepositoryImpl from '../../../censor/data/repositoryImpl/CourseRepositoryImpl';
import {
    GetCourseDetail,
    DeactivateCourse,
} from '../../domain/usecases';
import { ChangeCourseStatusRequest } from '../../domain/usecases/DeactivateCourse';
import GetCoursesByStatus, { GetCoursesByStatusRequest } from '../../domain/usecases/GetCoursesByStatus';

const courseRepository = new CourseRepositoryImpl();

export const fetchCourseDetail = createAsyncThunk('courses/fetchCourseDetail', async (courseId: number) => {
    const getCourseDetailUseCase = new GetCourseDetail(courseRepository);
    return await getCourseDetailUseCase.execute(courseId);
});

export const changeStatusOfCourse = createAsyncThunk('courses/DeactivateCourse', async (req: ChangeCourseStatusRequest) => {
    const DeactivateCourseUseCase = new DeactivateCourse(courseRepository);
    return await DeactivateCourseUseCase.execute(req);
});


export const fetchCoursesByStatus = createAsyncThunk(
    'courses/fetchCoursesByStatus',
    async (request: GetCoursesByStatusRequest) => {
        const getCoursesByStatus = new GetCoursesByStatus(courseRepository);
        return await getCoursesByStatus.execute(request);
    }
);