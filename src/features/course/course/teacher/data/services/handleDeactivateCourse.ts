import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import axiosService from '../../../../../../common/services/axiosService';
import Failure from '../../../../../../common/entities/Failure';
import ApiResponse from '../../../../../../common/entities/ApiResponse';
import { CourseState } from '../redux/courseSlice';

export const apiDeactivateCourse = async (
  courseId: number,
): ApiResponse<null> => {
  try {
    await axiosService.delete(`/TEACHER/api/course/deactivate/${courseId}`);
    return { data: null };
  } catch (error) {
    return {
      error: new Failure(error.response.data.message, error.response.status),
    };
  }
};

export const deactivateCourse = createAsyncThunk(
  'courses/DeactivateCourse',
  async (courseId: number) => {
    return await apiDeactivateCourse(courseId);
  },
);

const handleDeactivateCourse = (
  builder: ActionReducerMapBuilder<CourseState>,
) => {
  builder
    .addCase(deactivateCourse.pending, (state) => {
      state.deactivateCoursePage.status = 'loading';
    })
    .addCase(deactivateCourse.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.deactivateCoursePage.status = 'failed';
        state.deactivateCoursePage.error = action.payload.error.message;
      } else {
        state.deactivateCoursePage.status = 'succeeded';
        state.listCoursesPage.data?.filter(
          (course) => course.id !== action.meta.arg,
        );

        // data setted here
        const { data } = state.courseDetailPage;
        if (data) {
          state.courseDetailPage.data = {
            ...data,
            status: data.status === 'DEACTIVATED' ? 'APPROVED' : 'DEACTIVATED',
          };
        }
      }
    })
    .addCase(deactivateCourse.rejected, (state, action) => {
      state.deactivateCoursePage.status = 'failed';
      state.deactivateCoursePage.error = action.error.message;
    });
};

export default handleDeactivateCourse;
