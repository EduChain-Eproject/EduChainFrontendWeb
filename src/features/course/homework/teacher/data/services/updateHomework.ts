import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import ApiResponse from '../../../../../../common/entities/ApiResponse';
import Failure from '../../../../../../common/entities/Failure';
import Homework from '../../../../../../common/entities/Homework';
import axiosService from '../../../../../../common/services/axiosService';
import { HomeworkState } from '../redux/homeworkSlice';

export interface UpdateHomeworkReq {
  homeworkId: number;
  title: string;
  description: string;
}
const baseUrl = 'http://localhost:8080/';
export const apiUpdateHomework = async (
  homeworkData: UpdateHomeworkReq,
): ApiResponse<Homework> => {
  try {
    const response = await axiosService.put(
      `${baseUrl}TEACHER/api/homework/update/${homeworkData.homeworkId}`,
      homeworkData,
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

export const updateHomework = createAsyncThunk(
  'homework/updateHomework',
  async (homeworkData: UpdateHomeworkReq) => {
    return await apiUpdateHomework(homeworkData);
  },
);

const handleUpdateHomework = (
  builder: ActionReducerMapBuilder<HomeworkState>,
) => {
  builder
    .addCase(updateHomework.pending, (state) => {
      state.updateHomeworkPage.status = 'loading';
    })
    .addCase(updateHomework.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.updateHomeworkPage.status = 'failed';
        state.updateHomeworkPage.error = action.payload.error.message;
        state.updateHomeworkPage.errors = action.payload.error.errors;
      } else {
        state.updateHomeworkPage.status = 'succeeded';
        state.updateHomeworkPage.data = action.payload.data;
      }
    })
    .addCase(updateHomework.rejected, (state, action) => {
      state.updateHomeworkPage.status = 'failed';
      state.updateHomeworkPage.error = action.error.message;
    });
};

export default handleUpdateHomework;
