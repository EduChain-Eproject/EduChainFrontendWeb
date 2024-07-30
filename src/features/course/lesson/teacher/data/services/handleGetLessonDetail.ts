import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import ApiResponse from '../../../../../../common/entities/ApiResponse';
import Failure from '../../../../../../common/entities/Failure';
import Lesson from '../../../../../../common/entities/Lesson';
import axiosService from '../../../../../../common/services/axiosService';
import { LessonState } from '../redux/lessonSlice';

export const apiGetLessonDetail = async (
  lessonId: number,
): ApiResponse<Lesson> => {
  try {
    const response = await axiosService.get(
      `/TEACHER/api/lesson/detail/${lessonId}`,
    );
    return { data: response.data };
  } catch (error) {
    return {
      error: new Failure(error.response.data.message, error.response.status),
    };
  }
};

export const fetchLessonDetail = createAsyncThunk(
  'lessons/fetchLessonDetail',
  async (lessonId: number) => {
    return await apiGetLessonDetail(lessonId);
  },
);

const handleGetLessonDetail = (
  builder: ActionReducerMapBuilder<LessonState>,
) => {
  builder
    .addCase(fetchLessonDetail.pending, (state) => {
      state.lessonDetailPage.status = 'loading';
    })
    .addCase(fetchLessonDetail.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.lessonDetailPage.status = 'failed';
        state.lessonDetailPage.error = action.payload.error.message;
      } else {
        state.lessonDetailPage.status = 'succeeded';
        state.lessonDetailPage.data = action.payload.data;
      }
    })
    .addCase(fetchLessonDetail.rejected, (state, action) => {
      state.lessonDetailPage.status = 'failed';
      state.lessonDetailPage.error = action.error.message;
    });
};
export default handleGetLessonDetail;
