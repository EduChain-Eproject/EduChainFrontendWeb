import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import ApiResponse from '../../../../../../common/entities/ApiResponse';
import Failure from '../../../../../../common/entities/Failure';
import Lesson from '../../../../../../common/entities/Lesson';
import axiosService from '../../../../../../common/services/axiosService';
import { LessonState } from '../redux/lessonSlice';

export type CreateLessonReq = {
  chapterId: string;
  lessonTitle: string;
  description: string;
  videoTitle: string;
  videoFile: File | null;
};
const baseUrl = 'http://localhost:8080/';
export const apiCreateLesson = async (
  lessonData: CreateLessonReq,
): ApiResponse<Lesson> => {
  try {
    const formData = new FormData();
    // Kiểm tra và thêm tệp vào FormData
    if (lessonData.videoFile && lessonData.videoFile.length > 0) {
      formData.append('videoFile', lessonData.videoFile[0]);
    }
    formData.append('chapterId', lessonData.chapterId || '');
    formData.append('lessonTitle', lessonData.lessonTitle || '');
    formData.append('description', lessonData.description || '');
    formData.append('videoTitle', lessonData.videoTitle || '');

    const response = await axiosService.post(
      `${baseUrl}TEACHER/api/lesson/create`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure Content-Type is set correctly
        },
      },
    );

    return { data: response.data };
  } catch (error) {
    console.log(error);
    if (error.response) {
      const data = error.response.data;
      const message = data.errors.message || 'Validation error';
      const errors = data.errors;

      return {
        error: new Failure(message, errors, data.timestamp),
      };
    }
    return {
      error: new Failure('message', {}, ''),
    };
  }
};

export const createLesson = createAsyncThunk(
  'lessons/createLesson',
  async ({ lessonData }: { lessonData: CreateLessonReq }) => {
    return await apiCreateLesson(lessonData);
  },
);

const handleCreateLesson = (builder: ActionReducerMapBuilder<LessonState>) => {
  builder
    .addCase(createLesson.pending, (state) => {
      state.createLessonPage.status = 'loading';
    })
    .addCase(createLesson.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.createLessonPage.status = 'failed';
        state.createLessonPage.error = action.payload.error.message;
        state.createLessonPage.errors = action.payload.error.errors;
      } else {
        state.createLessonPage.status = 'succeeded';
        state.createLessonPage.data = action.payload.data;
      }
    })
    .addCase(createLesson.rejected, (state, action) => {
      state.createLessonPage.status = 'failed';
      state.createLessonPage.error = action.error.message;
    });
};
export default handleCreateLesson;
