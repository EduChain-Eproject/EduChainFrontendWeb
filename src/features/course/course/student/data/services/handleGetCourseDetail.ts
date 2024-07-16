import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { ApiResponse } from '../../../../../../common/entities/ApiResponse';
import Course from '../../../../../../common/entities/Course';
import Failure from '../../../../../../common/entities/Failure';
import axiosService from '../../../../../../common/services/axiosService';
import { CourseState } from '../redux/courseSlice';

const apiGetCourseDetail = async (courseId: number): ApiResponse<Course> => {
  try {
    const response = await axiosService.get(
      `/STUDENT/api/course/detail/${courseId}`,
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
    return apiGetCourseDetail(courseId);
  },
);

export const handleGetCourseDetail = (
  builder: ActionReducerMapBuilder<CourseState>,
) => {
  builder
    .addCase(fetchCourseDetail.pending, (state) => {
      state.courseDetailPage.status = 'loading';
    })
    .addCase(fetchCourseDetail.fulfilled, (state, action) => {
      state.courseDetailPage.status = 'succeeded';
      state.courseDetailPage.data = action.payload.data;
    })
    .addCase(fetchCourseDetail.rejected, (state, action) => {
      state.courseDetailPage.status = 'failed';
      state.courseDetailPage.error = action.payload as string;
    });
};

export default handleGetCourseDetail;
