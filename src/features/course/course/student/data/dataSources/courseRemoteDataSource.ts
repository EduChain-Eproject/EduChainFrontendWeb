import axiosService from '../../../../../../common/services/axiosService'
import Failure from '../../../../../../common/types/Failure';
import Page from '../../domain/entities/Page';
import { CourseSearchParams } from '../../domain/usecases/SearchCourses';
import { CourseDto } from '../models/CourseDto';

export const apiSearchCourses = async (params: CourseSearchParams): Promise<Page<CourseDto>> => {
    try {
        const response = await axiosService.post('/STUDENT/api/course/list', params);
        return response.data;
    } catch (error) {
        throw new Failure(error.response.data.message, error.response.status);
    }
}

export const apiGetCourseDetail = async (courseId: number): Promise<CourseDto> => {
    try {
        const response = await axiosService.get(`/STUDENT/api/course/detail/${courseId}`);
        return response.data;
    } catch (error) {
        throw new Failure(error.response.data.message, error.response.status);
    }
}