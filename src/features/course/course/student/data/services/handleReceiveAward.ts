import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import ApiResponse from '../../../../../../common/entities/ApiResponse';
import { AwardStatus } from '../../../../../../common/entities/Award';
import Failure from '../../../../../../common/entities/Failure';
import { UserAnswer } from '../../../../../../common/entities/UserAnswer';
import axiosService from '../../../../../../common/services/axiosService';
import { CourseState } from '../redux/courseSlice';

export interface receiveAwardReq {
  homeworkId: number;
}

const apiReceiveAward = async (
  req: receiveAwardReq,
): ApiResponse<UserAnswer> => {
  try {
    const response = await axiosService.post(
      `/STUDENT/api/award/receive/${req.homeworkId}`,
      req,
    );
    return { data: response.data };
  } catch (error) {
    return {
      error: new Failure(error.response.data.message, error.response.status),
    };
  }
};

export const receiveAward = createAsyncThunk(
  'homework/receiveAward',
  async (req: receiveAwardReq) => {
    return await apiReceiveAward(req);
  },
);

const handleReceiveAward = (builder: ActionReducerMapBuilder<CourseState>) => {
  builder
    .addCase(receiveAward.pending, (state) => {
      state.userAwardComponent.status = 'loading';
    })
    .addCase(receiveAward.fulfilled, (state, action) => {
      state.userAwardComponent.status = 'succeeded';

      if (state.userAwardComponent.data && !action.payload.error) {
        state.userAwardComponent.data = {
          ...state.userAwardComponent.data,
          status: AwardStatus.RECEIVED,
        };
      } else {
        state.userAwardComponent.error = action.payload.error?.message;
      }
    })
    .addCase(receiveAward.rejected, (state, action) => {
      state.userAwardComponent.status = 'failed';
      state.userAwardComponent.error = action.payload as string;
    });
};

export default handleReceiveAward;
