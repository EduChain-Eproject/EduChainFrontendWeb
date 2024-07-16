import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import ApiResponse from './../../../../../../common/entities/ApiResponse';
import { Page } from './../../../../../../common/entities/Page';
import Course from './../../../../../../common/entities/Course';
import axiosService from './../../../../../../common/services/axiosService';
import Failure from './../../../../../../common/entities/Failure';
import { CourseState } from '../redux/courseSlice';

export enum CourseStatusForCensor {
  APPROVED = 'APPROVED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  DELETED = 'DELETED',
  ALL = 'ALL',
}

export type GetCoursesByStatusRequest = {
  censorId: number;
  search: string;
  page: number;
  size: number;
  sortBy: string;

  status: CourseStatusForCensor | null;
};

export const apiGetCoursesByStatus = async (
  request: GetCoursesByStatusRequest,
): ApiResponse<Page<Course>> => {
  try {
    if (request.status == CourseStatusForCensor.ALL) {
      request = {
        ...request,
        status: null,
      };
    }
    const response = await axiosService.post(
      `/CENSOR/api/course/list`,
      request,
    );

    return { data: response.data };
  } catch (error) {
    return {
      error: new Failure(error.response.data.message, error.response.status),
    };
  }
};

export const fetchCoursesByStatus = createAsyncThunk(
  'courses/fetchCoursesByStatus',
  async (request: GetCoursesByStatusRequest) => {
    return await apiGetCoursesByStatus(request);
  },
);

const handleGetCoursebyStatus = (
  builder: ActionReducerMapBuilder<CourseState>,
) => {
  builder
    .addCase(fetchCoursesByStatus.pending, (state) => {
      state.listCoursesPage.status = 'loading';
    })
    .addCase(fetchCoursesByStatus.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.listCoursesPage.status = 'create course failed';
        state.listCoursesPage.error = action.payload.error.message;
      } else {
        state.listCoursesPage.status = 'create course succeeded';
        if (action.payload.data) {
          state.listCoursesPage.data = action.payload.data;
        }
      }
    })
    .addCase(fetchCoursesByStatus.rejected, (state, action) => {
      state.listCoursesPage.status = 'failed';
      state.listCoursesPage.error = action.error.message;
    });
};

export default handleGetCoursebyStatus;
