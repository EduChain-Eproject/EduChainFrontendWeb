import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import ApiResponse from '../../../../../../common/entities/ApiResponse';
import Failure from '../../../../../../common/entities/Failure';
import { Homework } from '../../../../../../common/entities/Homework';
import axiosService from '../../../../../../common/services/axiosService';
import { HomeworkState } from '../redux/homeworkSlice';

export const apiDeleteHomework = async (
  homeworkId: number,
): ApiResponse<number> => {
  try {
    const response = await axiosService.delete(
      `/TEACHER/api/homework/delete/${homeworkId}`,
    );
    return { data: response.data };
  } catch (error) {
    return {
      error: new Failure(error.response.data.message, error.response.status),
    };
  }
};

export const deleteHomework = createAsyncThunk(
  'homework/deleteHomework',
  async (homeworkId: number) => {
    return await apiDeleteHomework(homeworkId);
  },
);

const handleDeleteHomework = (
  builder: ActionReducerMapBuilder<HomeworkState>,
) => {
  builder
    .addCase(deleteHomework.pending, (state) => {
      state.homeworkDetailPage.status = 'loading';
    })
    .addCase(deleteHomework.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.homeworkDetailPage.status = 'failed';
        state.homeworkDetailPage.error = action.payload.error.message;
      } else {
        state.homeworkDetailPage.status = 'succeeded';
        state.deleteHomeworkPage.data = action.payload.data;
      }
    })
    .addCase(deleteHomework.rejected, (state, action) => {
      state.homeworkDetailPage.status = 'failed';
      state.homeworkDetailPage.error = action.error.message;
    });
};

export default handleDeleteHomework;
