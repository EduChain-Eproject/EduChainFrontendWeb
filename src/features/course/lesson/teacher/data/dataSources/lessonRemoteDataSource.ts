import axiosService from "../../../../../../common/services/axiosService";
import Failure from "../../../../../../common/entities/Failure";
import Lesson from "../../domain/entities/Lesson";
import { CreateLessonReq } from "../../domain/usecases/CreateLesson";
import { UpdateLessonReq } from "../../domain/usecases/UpdateLesson";
import { LessonDTO } from "../models/LessonDto";

export const apiGetLessonDetail = async (lessonId: number): Promise<LessonDTO> => {
    try {
        const response = await axiosService.get(`/TEACHER/api/lesson/detail/${lessonId}`);
        return response.data;
    } catch (error) {
        throw new Failure(error.response.data.message, error.response.status);
    }
}

export const apiUpdateLesson = async (lessonId: number, lessonData: UpdateLessonReq): Promise<LessonDTO> => {
    try {

        const formData = new FormData();
        formData.append('file', lessonData.file[0]);
        formData.append('lessonTitle', lessonData.lessonTitle);
        formData.append('description', lessonData.description);
        formData.append('videoTitle', lessonData.videoTitle);

        const response = await axiosService.put(`/TEACHER/api/lesson/update/${lessonId}`, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return response.data;
    } catch (error) {
        throw new Failure(error.response.data.message, error.response.status);
    }
}

export const apiCreateLesson = async (lessonData: CreateLessonReq): Promise<LessonDTO> => {
    try {
        const formData = new FormData();
        formData.append('file', lessonData.file[0]);
        formData.append('chapterId', lessonData.chapterId);
        formData.append('lessonTitle', lessonData.lessonTitle);
        formData.append('description', lessonData.chapterId);
        formData.append('videoTitle', lessonData.videoTitle);

        const response = await axiosService.post(`/TEACHER/api/lesson/create`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Ensure Content-Type is set correctly
            },
        });

        return response.data;
    } catch (error) {
        throw new Failure(error.response.data.message, error.response.status);
    }
};

export const apiDeleteLessonDetail = async (lessonId: number): Promise<number> => {
    try {
        const response = await axiosService.delete(`/TEACHER/api/lesson/delete/${lessonId}`);
        return response.data;
    } catch (error) {
        throw new Failure(error.response.data.message, error.response.status);
    }
}
