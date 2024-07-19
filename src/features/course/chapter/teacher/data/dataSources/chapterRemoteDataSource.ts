import axiosService from '../../../../../../common/services/axiosService'
import Failure from '../../../../../../common/entities/Failure';
import { CreateChapterReq } from '../../domain/usecases/CreateChapter';
import { UpdateChapterReq } from '../../domain/usecases/UpdateChapter';
import { ChapterDTO } from '../models/ChapterDto';

export const apiGetChapterDetail = async (chapterId: number): Promise<ChapterDTO> => {
    try {
        const response = await axiosService.get(`/TEACHER/api/chapter/detail/${chapterId}`);
        return response.data;
    } catch (error) {
        throw new Failure(error.response.data.message, error.response.status);
    }
}

export const apiUpdateChapter = async (chapterId: number, chapterData: UpdateChapterReq): Promise<ChapterDTO> => {
    try {
        const response = await axiosService.put(`/TEACHER/api/chapter/update/${chapterId}`, chapterData);
        return response.data;
    } catch (error) {
        throw new Failure(error.response.data.message, error.response.status);
    }
}

export const apiDeleteChapter = async (chapterId: number): Promise<number> => {
    try {
        const response = await axiosService.delete(`/TEACHER/api/chapter/delete/${chapterId}`,);
        return response.data;
    } catch (error) {
        throw new Failure(error.response.data.message, error.response.status);
    }
}

export const apiCreateChapter = async (chapterData: CreateChapterReq): Promise<ChapterDTO> => {
    try {
        const response = await axiosService.post(`/TEACHER/api/chapter/create`, chapterData);
        return response.data;
    } catch (error) {
        throw new Failure(error.response.data.message, error.response.status);
    }
}

