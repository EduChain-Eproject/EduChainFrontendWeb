import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import ApiResponse from '../../../../../../common/entities/ApiResponse';
import { Award, AwardStatus } from '../../../../../../common/entities/Award';
import Failure from '../../../../../../common/entities/Failure';
import { UserAnswer } from '../../../../../../common/entities/UserAnswer';
import axiosService from '../../../../../../common/services/axiosService';
import { HomeworkState } from '../redux/homeworkSlice';

export enum TeacherUpdatingAwardStatus {
  APPROVE = 'APPROVE',
  REJECT = 'REJECT',
}

export interface approveOrRejectAwardReq {
  awardId: number;
  updatingAwardStatus: TeacherUpdatingAwardStatus;
}

const apiApproveOrRejectAward = async (
  req: approveOrRejectAwardReq,
): ApiResponse<Award> => {
  try {
    const response = await axiosService.post(
      `/TEACHER/api/award/approve_or_reject/${req.awardId}`,
      req,
    );
    return { data: response.data };
  } catch (error) {
    return {
      error: new Failure(error.response.data.message, error.response.status),
    };
  }
};

export const approveOrRejectAward = createAsyncThunk(
  'homework/approveOrRejectAward',
  async (req: approveOrRejectAwardReq) => {
    return await apiApproveOrRejectAward(req);
  },
);

const handleApproveOrRejectAward = (
  builder: ActionReducerMapBuilder<HomeworkState>,
) => {
  builder
    // TODO
    .addCase(approveOrRejectAward.pending, (state) => {
      state.homeworkDetailPage.status = 'loading';
    })
    .addCase(approveOrRejectAward.fulfilled, (state, action) => {
      state.homeworkDetailPage.status = 'succeeded';

      if (state.homeworkDetailPage.data && !action.payload.error) {
        state.homeworkDetailPage.data = {
          ...state.homeworkDetailPage.data,
          userHomeworkDtos: state.homeworkDetailPage.data.userHomeworkDtos?.map(
            (uh) => {
              if (uh.userAwardDto?.id == action.payload.data?.id) {
                uh.userAwardDto = action.payload.data;
              }
              return uh;
            },
          ),
        };
      } else {
        state.homeworkDetailPage.error = action.payload.error?.message;
      }
    })
    .addCase(approveOrRejectAward.rejected, (state, action) => {
      state.homeworkDetailPage.status = 'failed';
      state.homeworkDetailPage.error = action.payload as string;
    });
};

export default handleApproveOrRejectAward;
