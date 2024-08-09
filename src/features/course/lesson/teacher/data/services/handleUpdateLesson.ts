import {
  ActionReducerMapBuilder,
  createAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import Lesson from '../../../../../../common/entities/Lesson';
import ApiResponse from '../../../../../../common/entities/ApiResponse';
import axiosService from '../../../../../../common/services/axiosService';
import Failure from '../../../../../../common/entities/Failure';
import { LessonState } from '../redux/lessonSlice';

export type UpdateLessonReq = {
  lessonTitle: string;
  description: string;
  videoTitle: string;
  videoFile: File;
};
const baseUrl = 'http://localhost:8080/';
export const apiUpdateLesson = async (
  lessonId: number,
  lessonData: UpdateLessonReq,
): ApiResponse<Lesson> => {
  try {
    const formData = new FormData();
    // Kiểm tra và thêm tệp vào FormData
    if (lessonData.videoFile && lessonData.videoFile.length > 0) {
      formData.append('videoFile', lessonData.videoFile[0]);
    }
    formData.append('lessonTitle', lessonData.lessonTitle || '');
    formData.append('description', lessonData.description || '');
    formData.append('videoTitle', lessonData.videoTitle || '');

    const response = await axiosService.put(
      `${baseUrl}TEACHER/api/lesson/update/${lessonId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    console.log(formData);
    return { data: response.data };
  } catch (error) {
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

export const updateLesson = createAsyncThunk(
  'lessons/updateLesson',
  async ({
    lessonId,
    lessonData,
  }: {
    lessonId: number;
    lessonData: UpdateLessonReq;
  }) => {
    return await apiUpdateLesson(lessonId, lessonData);
  },
);
export const resetUpdateLesson = createAction('lessons/resetUpdateLesson');

const handleUpdateLesson = (builder: ActionReducerMapBuilder<LessonState>) => {
  builder
    .addCase(updateLesson.pending, (state) => {
      state.updateLessonPage.status = 'loading';
    })
    .addCase(updateLesson.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.updateLessonPage.status = 'failed';
        state.updateLessonPage.error = action.payload.error.message;
        state.updateLessonPage.errors = action.payload.error.errors;
      } else {
        state.updateLessonPage.status = 'succeeded';
        console.log(state.updateLessonPage.status);
        state.updateLessonPage.data = action.payload.data;
      }
    })
    .addCase(updateLesson.rejected, (state, action) => {
      state.updateLessonPage.status = 'failed';
      state.updateLessonPage.error = action.error.message;
    })
    .addCase(resetUpdateLesson, (state) => {
      state.updateLessonPage.status = 'idle';
      state.updateLessonPage.error = undefined;
      state.updateLessonPage.data = undefined;
      state.updateLessonPage.errors = undefined;
    });
};
export default handleUpdateLesson;
