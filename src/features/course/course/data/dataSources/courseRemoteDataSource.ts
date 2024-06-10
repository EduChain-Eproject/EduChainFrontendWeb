import axiosService from '../../../../../common/services/axiosService'
import Failure from '../../../../../common/types/Failure';
import Course from '../../domain/entities/Course';
import { CreateCourseReq } from '../../domain/usecases/CreateCourse';
import { UpdateCourseReq } from '../../domain/usecases/UpdateCourse';

export const apiFetchCourses: () => Promise<Course[]> = async () => {
    try {
        const response = await axiosService.get('/courses');
        return response.data;
    } catch (error) {
        throw new Failure(error.response.data.message, error.response.status);
    }
};

export const apiFetchCourseDetail = async (courseId: string) => {
    try {
        const response = await axiosService.get(`/courses/${courseId}`);
        return response.data;
    } catch (error) {
        throw new Failure(error.response.data.message, error.response.status);
    }
};

export const apiCreateCourse = async (courseData: CreateCourseReq) => {
    try {
        const response = await axiosService.post('/courses', courseData);
        return response.data;
    } catch (error) {
        throw new Failure(error.response.data.message, error.response.status);
    }
};

export const apiUpdateCourse = async (courseId: string, courseData: UpdateCourseReq) => {
    try {
        const response = await axiosService.put(`/courses/${courseId}`, courseData);
        return response.data;
    } catch (error) {
        throw new Failure(error.response.data.message, error.response.status);
    }
};

export const apiDeleteCourse = async (courseId: string) => {
    try {
        const response = await axiosService.delete(`/courses/${courseId}`);
        return response.data;
    } catch (error) {
        throw new Failure(error.response.data.message, error.response.status);
    }
};

