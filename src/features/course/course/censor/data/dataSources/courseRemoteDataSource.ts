import axiosService from '../../../../../../common/services/axiosService'
import Failure from '../../../../../../common/types/Failure';
import Course from '../../domain/entities/Course';
import Page from '../../domain/entities/Page';
import { ChangeCourseStatusRequest } from '../../domain/usecases/DeactivateCourse';
import { CourseStatusForCensor, GetCoursesByStatusRequest } from '../../domain/usecases/GetCoursesByStatus';
import { CategoryDto } from '../models/CategoryDto';
import { CourseDto } from '../models/CourseDto';


export const apiFetchCourseDetail: (courseId: number) => Promise<CourseDto> = async (
    courseId: number
) => {
    try {
        const response = await axiosService.get(`/CENSOR/api/course/detail/${courseId}`);
        return response.data;
    } catch (error) {
        throw new Failure(error.response.data.message, error.response.status);
    }
};

export const apiGetCoursesByStatus = async (
    request: GetCoursesByStatusRequest
): Promise<Page<CourseDto>> => {
    try {
        if (request.status == CourseStatusForCensor.ALL) {
            request = {
                ...request,
                status: null
            }
        }
        const response = await axiosService.post(`/CENSOR/api/course/list`, request);

        return response.data;
    } catch (error) {
        throw new Failure(error.response.data.message, error.response.status);
    }
};

export const apiDeactivateCourse = async (
    request: ChangeCourseStatusRequest
): Promise<CourseDto> => {
    try {
        const response = await axiosService.post(`/CENSOR/api/course/approve-or-delete/${request.courseId}`, request);
        return response.data;
    } catch (error) {
        throw new Failure(error.response.data.message, error.response.status);
    }
};

