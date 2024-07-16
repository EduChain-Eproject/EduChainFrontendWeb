import axiosService from '../../../../../../common/services/axiosService'
import Failure from '../../../../../../common/entities/Failure';
import { LessonDTO } from '../models/LessonDto';

export const apiGetLessonDetail = async (lessonId: number): Promise<LessonDTO> => {
    try {
        const response = await axiosService.get(`/STUDENT/api/lesson/detail/${lessonId}`);
        return response.data;
    } catch (error) {
        throw new Failure(error.response.data.message, error.response.status);
    }
}
