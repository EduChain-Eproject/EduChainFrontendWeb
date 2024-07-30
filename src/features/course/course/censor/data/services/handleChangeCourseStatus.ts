import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { CourseState } from '../redux/courseSlice';
import ApiResponse from '../../../../../../common/entities/ApiResponse';
import Course from '../../../../../../common/entities/Course';
import axiosService from '../../../../../../common/services/axiosService';
import Failure from '../../../../../../common/entities/Failure';
import { CourseStatusForCensor } from './handleGetCourseByStatus';

export type ChangeCourseStatusRequest = {
  courseId: number;
  status: CourseStatusForCensor;
};

export const apiChangeCourseStatus = async (
  request: ChangeCourseStatusRequest,
): ApiResponse<Course> => {
  try {
    const response = await axiosService.post(
      `/CENSOR/api/course/approve-or-delete/${request.courseId}`,
      request,
    );
    return { data: response.data };
  } catch (error) {
    return {
      error: new Failure(error.response.data.message, error.response.status),
    };
  }
};

export const changeStatusOfCourse = createAsyncThunk(
  'courses/DeactivateCourse',
  async (req: ChangeCourseStatusRequest) => {
    return await apiChangeCourseStatus(req);
  },
);

const handleChangeCourseStatus = (
  builder: ActionReducerMapBuilder<CourseState>,
) => {
  builder
    .addCase(changeStatusOfCourse.pending, (state) => {
      state.changeStatusOfCoursePage.status = 'loading';
    })
    .addCase(changeStatusOfCourse.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.changeStatusOfCoursePage.status = 'failed';
        state.changeStatusOfCoursePage.error = action.payload.error.message;
      } else {
        state.changeStatusOfCoursePage.status = 'succeeded';

        // data setted here
        const { data } = state.courseDetailPage;
        if (data && action.payload.data) {
          state.courseDetailPage.data = {
            ...data,
            status: action.payload.data?.status,
          };
        }
      }
    })
    .addCase(changeStatusOfCourse.rejected, (state, action) => {
      state.changeStatusOfCoursePage.status = 'failed';
      state.changeStatusOfCoursePage.error = action.error.message;
    });
};

export default handleChangeCourseStatus;
