import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import ApiResponse from '../../../../../../common/entities/ApiResponse';
import Failure from '../../../../../../common/entities/Failure';
import { UserCourse } from '../../../../../../common/entities/UserCourse';
import axiosService from '../../../../../../common/services/axiosService';
import { CourseState } from '../redux/courseSlice';

const apiEnrollACourse = async (courseId: number): ApiResponse<UserCourse> => {
  try {
    const response = await axiosService.post(
      `/STUDENT/api/course/enroll-in-a-course/${courseId}`,
    );
    return { data: response.data };
  } catch (error) {
    return {
      error: new Failure(error.response.data.message, error.response.status),
    };
  }
};

export const enrollACourse = createAsyncThunk(
  'courses/enrollACourse',
  async (courseId: number) => {
    return await apiEnrollACourse(courseId);
  },
);

export const handleEnrollACourse = (
  builder: ActionReducerMapBuilder<CourseState>,
) => {
  builder
    .addCase(enrollACourse.pending, (state) => {
      state.courseDetailPage.status = 'loading';
    })
    .addCase(enrollACourse.fulfilled, (state, action) => {
      state.courseDetailPage.status = 'succeeded';

      if (state.courseDetailPage.data && action.payload.data) {
        state.courseDetailPage.data = {
          ...state.courseDetailPage.data,
          currentUserCourse: action.payload.data, // TODO
        };
      }
    })
    .addCase(enrollACourse.rejected, (state, action) => {
      state.courseDetailPage.status = 'failed';
      state.courseDetailPage.error = action.payload as string;
    });
};

export default handleEnrollACourse;
