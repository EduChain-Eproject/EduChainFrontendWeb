import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { CourseState } from '../redux/courseSlice';
import Course from '../../../../../../common/entities/Course';
import ApiResponse from '../../../../../../common/entities/ApiResponse';
import axiosService from '../../../../../../common/services/axiosService';
import Failure from '../../../../../../common/entities/Failure';

export const apiFetchCourseDetail: (
  courseId: number,
) => ApiResponse<Course> = async (courseId: number) => {
  try {
    const response = await axiosService.get(
      `/CENSOR/api/course/detail/${courseId}`,
    );
    return { data: response.data };
  } catch (error) {
    return {
      error: new Failure(error.response.data.message, error.response.status),
    };
  }
};

export const fetchCourseDetail = createAsyncThunk(
  'courses/fetchCourseDetail',
  async (courseId: number) => {
    return await apiFetchCourseDetail(courseId);
  },
);

const handleFetchCourseDetail = (
  builder: ActionReducerMapBuilder<CourseState>,
) => {
  builder
    .addCase(fetchCourseDetail.pending, (state) => {
      state.courseDetailPage.status = 'loading';
    })
    .addCase(fetchCourseDetail.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.courseDetailPage.status = 'failed';
        state.courseDetailPage.error = action.payload.error.message;
      } else {
        state.courseDetailPage.status = 'succeeded';
        state.courseDetailPage.data = action.payload.data;
      }
    })
    .addCase(fetchCourseDetail.rejected, (state, action) => {
      state.courseDetailPage.status = 'failed';
      state.courseDetailPage.error = action.error.message;
    });
};

export default handleFetchCourseDetail;
