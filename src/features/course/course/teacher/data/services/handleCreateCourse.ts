import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { CourseState } from '../redux/courseSlice';
import Course from '../../../../../../common/entities/Course';
import ApiResponse from '../../../../../../common/entities/ApiResponse';
import axiosService from '../../../../../../common/services/axiosService';
import Failure from '../../../../../../common/entities/Failure';

export type CreateCourseReq = {
  title: string;
  description: string;
  price: number;
  categoryIds: number[];
};

export const apiCreateCourse = async (
  courseData: CreateCourseReq,
): ApiResponse<Course> => {
  try {
    const response = await axiosService.post(
      '/TEACHER/api/course/create',
      courseData,
    );
    return { data: response.data };
  } catch (error) {
    return {
      error: new Failure(error.response.data.message, error.response.status),
    };
  }
};

export const createCourse = createAsyncThunk(
  'courses/createCourse',
  async (courseData: CreateCourseReq) => {
    return await apiCreateCourse(courseData);
  },
);

const handleCreateCourse = (builder: ActionReducerMapBuilder<CourseState>) => {
  builder
    .addCase(createCourse.pending, (state) => {
      state.createCoursePage.status = 'loading';
    })
    .addCase(createCourse.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.createCoursePage.status = 'create course failed';
        state.createCoursePage.error = action.payload.error.message;
      } else {
        state.createCoursePage.status = 'create course succeeded';
        action.payload.data &&
          state.listCoursesPage.data?.push(action.payload.data);
      }
    })
    .addCase(createCourse.rejected, (state, action) => {
      state.createCoursePage.status = 'failed';
      state.createCoursePage.error = action.error.message;
    });
};

export default handleCreateCourse;
