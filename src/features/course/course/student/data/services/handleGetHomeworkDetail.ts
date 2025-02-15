import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import ApiResponse from '../../../../../../common/entities/ApiResponse';
import { Award } from '../../../../../../common/entities/Award';
import Failure from '../../../../../../common/entities/Failure';
import Homework from '../../../../../../common/entities/Homework';
import { UserHomework } from '../../../../../../common/entities/UserHomework';
import axiosService from '../../../../../../common/services/axiosService';
import { CourseState } from '../redux/courseSlice';
const baseUrl = 'http://localhost:8080/';
const apiGetHomeworkDetail = async (
  homeworkId: number,
): ApiResponse<{
  homeworkDto: Homework;
  userHomeworkDto: UserHomework;
  awardDto: Award;
}> => {
  try {
    const response = await axiosService.get(
      `${baseUrl}STUDENT/api/homework/detail/${homeworkId}`,
    );
    return { data: response.data };
  } catch (error) {
    return {
      error: new Failure(error.response.data.message, error.response.status),
    };
  }
};

export const fetchHomeworkDetail = createAsyncThunk(
  'homeworks/fetchHomeworkDetail',
  async (homeworkId: number) => {
    return await apiGetHomeworkDetail(homeworkId);
  },
);

const handleGetHomeworkDetail = (
  builder: ActionReducerMapBuilder<CourseState>,
) => {
  builder
    .addCase(fetchHomeworkDetail.pending, (state) => {
      state.homeworkDetailComponent.status = 'loading';
    })
    .addCase(fetchHomeworkDetail.fulfilled, (state, action) => {
      state.homeworkDetailComponent.status = 'succeeded';
      if (action.payload.error) {
        state.homeworkDetailComponent.error = action.payload.error.message;
      } else {
        state.homeworkDetailComponent.data = action.payload.data?.homeworkDto;
        state.userHomeworkComponent.data = action.payload.data?.userHomeworkDto;
        state.userAwardComponent.data = action.payload.data?.awardDto;
      }
    })
    .addCase(fetchHomeworkDetail.rejected, (state, action) => {
      state.homeworkDetailComponent.status = 'failed';
      state.homeworkDetailComponent.error = action.payload as string;
    });
};

export default handleGetHomeworkDetail;
