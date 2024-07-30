import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import ApiResponse from '../../../../../../common/entities/ApiResponse';
import Course from '../../../../../../common/entities/Course';
import Failure from '../../../../../../common/entities/Failure';
import axiosService from '../../../../../../common/services/axiosService';
import { CourseState } from '../redux/courseSlice';

export type GetCoursesByTeacherRequest = {
  teacherId: number;
  search: string;
  page: number;
  size: number;
  sortBy: string;
};

export const apiGetCoursesByTeacher = async (
  request: GetCoursesByTeacherRequest,
): ApiResponse<Course[]> => {
  try {
    const response = await axiosService.post(
      `/TEACHER/api/course/list`,
      request,
    );

    return { data: response.data.content };
  } catch (error) {
    return {
      error: new Failure(error.response.data.message, error.response.status),
    };
  }
};

export const fetchCoursesByTeacher = createAsyncThunk(
  'courses/fetchCoursesByTeacher',
  async (request: GetCoursesByTeacherRequest) => {
    return await apiGetCoursesByTeacher(request);
  },
);

const handleGetCourseByTeacher = (
  builder: ActionReducerMapBuilder<CourseState>,
) => {
  builder
    .addCase(fetchCoursesByTeacher.pending, (state) => {
      state.listCoursesPage.status = 'loading';
    })
    .addCase(fetchCoursesByTeacher.fulfilled, (state, action) => {
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
    .addCase(fetchCoursesByTeacher.rejected, (state, action) => {
      state.listCoursesPage.status = 'failed';
      state.listCoursesPage.error = action.error.message;
    });
};

export default handleGetCourseByTeacher;
