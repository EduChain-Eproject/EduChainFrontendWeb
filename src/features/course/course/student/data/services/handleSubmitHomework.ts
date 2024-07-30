import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import ApiResponse from '../../../../../../common/entities/ApiResponse';
import { Award } from '../../../../../../common/entities/Award';
import Failure from '../../../../../../common/entities/Failure';
import { UserHomework } from '../../../../../../common/entities/UserHomework';
import axiosService from '../../../../../../common/services/axiosService';
import { CourseState } from '../redux/courseSlice';

export interface SubmitHomeworkResponse {
  submission: UserHomework;
  award: Award;
}

const apiSubmitHomework = async (
  homeworkId: number,
): ApiResponse<SubmitHomeworkResponse> => {
  try {
    const response = await axiosService.post(
      `/STUDENT/api/homework/submit/${homeworkId}`,
    );
    return { data: response.data };
  } catch (error) {
    return {
      error: new Failure(error.response.data, error.response.status),
    };
  }
};

export const submitHomework = createAsyncThunk(
  'homework/submitHomework',
  async (homeworkId: number) => {
    return await apiSubmitHomework(homeworkId);
  },
);

const handleSubmitHomework = (
  builder: ActionReducerMapBuilder<CourseState>,
) => {
  builder
    .addCase(submitHomework.pending, (state) => {
      state.userAwardComponent.status = 'loading';
    })
    .addCase(submitHomework.fulfilled, (state, action) => {
      state.userAwardComponent.status = 'succeeded';

      if (!action.payload.error) {
        state.userAwardComponent.data = action.payload?.data?.award;
        state.userHomeworkComponent.data = action.payload.data?.submission;
      } else {
        state.userHomeworkComponent.status = 'failed';
        state.userHomeworkComponent.error = action.payload.error?.message;
      }
    });
};

export default handleSubmitHomework;
