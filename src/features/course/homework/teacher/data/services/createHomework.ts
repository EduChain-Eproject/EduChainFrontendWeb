import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import ApiResponse from '../../../../../../common/entities/ApiResponse';
import Failure from '../../../../../../common/entities/Failure';
import Homework from '../../../../../../common/entities/Homework';
import axiosService from '../../../../../../common/services/axiosService';
import { HomeworkState } from '../redux/homeworkSlice';

export interface CreateHomeworkReq {
  lessonId: number;
  title: string;
  description: string;
}
const baseUrl = 'http://localhost:8080/';
export const apiCreateHomework = async (
  homeworkData: CreateHomeworkReq,
): ApiResponse<Homework> => {
  try {
    const response = await axiosService.post(
      `${baseUrl}TEACHER/api/homework/create`,
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

export const createHomework = createAsyncThunk(
  'homework/createHomework',
  async (homeworkData: CreateHomeworkReq) => {
    return await apiCreateHomework(homeworkData);
  },
);

const handleCreateHomework = (
  builder: ActionReducerMapBuilder<HomeworkState>,
) => {
  builder
    .addCase(createHomework.pending, (state) => {
      state.createHomeworkPage.status = 'loading';
    })
    .addCase(createHomework.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.createHomeworkPage.status = 'failed';
        state.createHomeworkPage.error = action.payload.error.message;
        state.createHomeworkPage.errors = action.payload.error.errors;
      } else {
        state.createHomeworkPage.status = 'succeeded';
        state.createHomeworkPage.data = action.payload.data;
      }
    })
    .addCase(createHomework.rejected, (state, action) => {
      state.createHomeworkPage.status = 'failed';
      state.createHomeworkPage.error = action.error.message;
    });
};

export default handleCreateHomework;
