import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import ApiResponse from '../../../../../../common/entities/ApiResponse';
import Failure from '../../../../../../common/entities/Failure';
import Homework from '../../../../../../common/entities/Homework';
import axiosService from '../../../../../../common/services/axiosService';
import { HomeworkState } from '../redux/homeworkSlice';
const baseUrl = 'http://localhost:8080/';
export const apiGetHomeworkDetail = async (
  homeworkId: number,
): ApiResponse<Homework> => {
  try {
    const response = await axiosService.get(
      `${baseUrl}TEACHER/api/homework/detail/${homeworkId}`,
    );
    return { data: response.data };
  } catch (error) {
    return {
      error: new Failure(error.response.data.message, error.response.status),
    };
  }
};

export const getHomeworkDetail = createAsyncThunk(
  'homework/getHomeworkDetail',
  async (homeworkId: number) => {
    return await apiGetHomeworkDetail(homeworkId);
  },
);

const handleGetHomeworkDetail = (
  builder: ActionReducerMapBuilder<HomeworkState>,
) => {
  builder
    .addCase(getHomeworkDetail.pending, (state) => {
      state.homeworkDetailPage.status = 'loading';
    })
    .addCase(getHomeworkDetail.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.homeworkDetailPage.status = 'failed';
        state.homeworkDetailPage.error = action.payload.error.message;
      } else {
        state.homeworkDetailPage.status = 'succeeded';
        state.homeworkDetailPage.data = action.payload.data;
      }
    })
    .addCase(getHomeworkDetail.rejected, (state, action) => {
      state.homeworkDetailPage.status = 'failed';
      state.homeworkDetailPage.error = action.error.message;
    });
};

export default handleGetHomeworkDetail;
