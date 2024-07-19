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

export const apiUpdateHomework = async (
  homeworkData: UpdateHomeworkReq,
): ApiResponse<Homework> => {
  try {
    const response = await axiosService.put(
      `/TEACHER/api/homework/update/${homeworkData.homeworkId}`,
      homeworkData,
    );
    return { data: response.data };
  } catch (error) {
    return {
      error: new Failure(error.response.data.message, error.response.status),
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
