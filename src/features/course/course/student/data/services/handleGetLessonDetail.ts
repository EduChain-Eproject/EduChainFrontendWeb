import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import ApiResponse from '../../../../../../common/entities/ApiResponse';
import Failure from '../../../../../../common/entities/Failure';
import Lesson from '../../../../../../common/entities/Lesson';
import axiosService from '../../../../../../common/services/axiosService';
import { CourseState } from '../redux/courseSlice';
const baseUrl = 'http://localhost:8080/';
const apiGetLessonDetail = async (lessonId: number): ApiResponse<Lesson> => {
  try {
    const response = await axiosService.get(
      `${baseUrl}STUDENT/api/lesson/detail/${lessonId}`,
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

export const handleGetLessonDetail = (
  builder: ActionReducerMapBuilder<CourseState>,
) => {
  builder
    .addCase(fetchLessonDetail.pending, (state) => {
      state.courseDetailPage.status = 'loading';
    })
    .addCase(fetchLessonDetail.fulfilled, (state, action) => {
      state.courseDetailPage.status = 'succeeded';
      state.lessonDetailPage.data = action.payload.data;
    })
    .addCase(fetchLessonDetail.rejected, (state, action) => {
      state.courseDetailPage.status = 'failed';
      state.courseDetailPage.error = action.payload as string;
    });
};

export default handleGetLessonDetail;
