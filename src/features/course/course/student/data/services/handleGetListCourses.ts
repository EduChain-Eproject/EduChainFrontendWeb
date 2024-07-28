import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import ApiResponse from '../../../../../../common/entities/ApiResponse';
import Course from '../../../../../../common/entities/Course';
import Failure from '../../../../../../common/entities/Failure';
import { Page } from '../../../../../../common/entities/Page';
import axiosService from '../../../../../../common/services/axiosService';
import { CourseState } from '../redux/courseSlice';

export interface CourseSearchParams {
  search?: string;
  page?: number;
  sortBy?: string;
  categoryIds?: number[];
}

const apiSearchCourses = async (
  params: CourseSearchParams,
): ApiResponse<Page<Course>> => {
  try {
    const response = await axiosService.post(
      '/STUDENT/api/course/list',
      params,
    );
    return {
      data: response.data,
    };
  } catch (error) {
    return {
      error: new Failure(error.response.data.message, error.response.status),
    };
  }
};

export const searchCourses = createAsyncThunk(
  'courses/searchCourses',
  async (params: CourseSearchParams) => {
    return await apiSearchCourses(params);
  },
);

export const handleGetListCourses = (
  builder: ActionReducerMapBuilder<CourseState>,
) => {
  builder
    .addCase(searchCourses.pending, (state) => {
      state.listCoursesPage.status = 'loading';
    })
    .addCase(searchCourses.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.listCoursesPage.status = 'create course failed';
        state.listCoursesPage.error = action.payload.error.message;
      } else {
        state.listCoursesPage.status = 'create course succeeded';
        if (action.payload.data && state.listCoursesPage.data) {
          state.listCoursesPage.data.courses = action.payload.data;
        }
      }
    })
    .addCase(searchCourses.rejected, (state, action) => {
      state.listCoursesPage.status = 'failed';
      state.listCoursesPage.error = action.error.message;
    });
};

export default handleGetListCourses;
