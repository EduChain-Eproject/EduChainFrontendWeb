import {
  ActionReducerMapBuilder,
  createAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import ApiResponse from '../../../../../../common/entities/ApiResponse';
import Course from '../../../../../../common/entities/Course';
import Failure from '../../../../../../common/entities/Failure';
import axiosService from '../../../../../../common/services/axiosService';
import { CourseState } from '../redux/courseSlice';

const baseUrl = 'http://localhost:8080/';

export type UpdateCourseReq = {
  title: string;
  description: string;
  price: number;
  categoryIds: number[];
  avatarCourse: File;
};

export const apiUpdateCourse = async (
  courseId: number,
  courseData: FormData,
): ApiResponse<Course> => {
  try {
    const response = await axiosService.put(
      `${baseUrl}TEACHER/api/course/update/${courseId}`,
      courseData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
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

export const updateCourse = createAsyncThunk(
  'courses/updateCourse',
  async ({
    courseId,
    courseData,
  }: {
    courseId: number;
    courseData: FormData;
  }) => {
    return await apiUpdateCourse(courseId, courseData);
  },
);

export const resetCourseUpdate = createAction('courses/resetCouresState');

const handleUpdateCourse = (builder: ActionReducerMapBuilder<CourseState>) => {
  builder
    .addCase(updateCourse.pending, (state) => {
      state.updateCoursePage.status = 'loading';
    })
    .addCase(updateCourse.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.updateCoursePage.status = 'failed';
        state.updateCoursePage.error = action.payload.error.message;
        state.updateCoursePage.errors = action.payload.error.errors;
      } else {
        state.updateCoursePage.status = 'succeeded';
        state.courseDetailPage.data = action.payload.data;
      }
    })
    .addCase(updateCourse.rejected, (state, action) => {
      state.updateCoursePage.status = 'failed';
      state.updateCoursePage.error = action.error.message;
    })
    .addCase(resetCourseUpdate, (state) => {
      state.updateCoursePage = {
        status: 'idle',
        data: undefined,
        error: undefined,
        errors: undefined,
      };
    });
};

export default handleUpdateCourse;
