import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { CourseState } from '../redux/courseSlice';
import Course from '../../../../../../common/entities/Course';
import ApiResponse from '../../../../../../common/entities/ApiResponse';
import axiosService from '../../../../../../common/services/axiosService';
import Failure from '../../../../../../common/entities/Failure';
const baseUrl = 'http://localhost:8080/';
export type CreateCourseReq = {
  title: string;
  description: string;
  price: number;
  categoryIds: number[];
  avatarCourse: File;
};

export const apiCreateCourse = async (
  courseData: FormData,
): ApiResponse<Course> => {
  try {
    const response = await axiosService.post(
      `${baseUrl}TEACHER/api/course/create`,
      courseData,
    );
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

export const createCourse = createAsyncThunk(
  'courses/createCourse',
  async (courseData: FormData) => {
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
        state.createCoursePage.errors = action.payload.error.errors;
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
