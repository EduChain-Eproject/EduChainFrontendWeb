import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import ApiResponse from '../../../../../../common/entities/ApiResponse';
import Failure from '../../../../../../common/entities/Failure';
import axiosService from '../../../../../../common/services/axiosService';
import { LessonState } from '../redux/lessonSlice';

export const apiDeleteLessonDetail = async (
  lessonId: number,
): ApiResponse<number> => {
  try {
    const response = await axiosService.delete(
      `/TEACHER/api/lesson/delete/${lessonId}`,
    );
    return { data: response.data };
  } catch (error) {
    return {
      error: new Failure(error.response.data.message, error.response.status),
    };
  }
};

export const deleteLesson = createAsyncThunk(
  'lessons/deleteLesson',
  async (lessonId: number) => {
    return await apiDeleteLessonDetail(lessonId);
  },
);

const handleDeleteLesson = (builder: ActionReducerMapBuilder<LessonState>) => {
  builder
    .addCase(deleteLesson.pending, (state) => {
      state.deleteLessonPage.status = 'loading';
    })
    .addCase(deleteLesson.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.deleteLessonPage.status = 'failed';
        state.deleteLessonPage.error = action.payload.error.message;
      } else {
        state.deleteLessonPage.status = 'succeeded';
        state.deleteLessonPage.data = action.payload.data;
      }
    })
    .addCase(deleteLesson.rejected, (state, action) => {
      state.deleteLessonPage.status = 'failed';
      state.deleteLessonPage.error = action.error.message;
    });
};
export default handleDeleteLesson;
