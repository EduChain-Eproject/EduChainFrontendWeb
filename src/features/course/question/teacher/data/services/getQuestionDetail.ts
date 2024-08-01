import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import ApiResponse from '../../../../../../common/entities/ApiResponse';
import Failure from '../../../../../../common/entities/Failure';
import { Question } from '../../../../../../common/entities/Question';
import axiosService from '../../../../../../common/services/axiosService';
import { QuestionState } from '../redux/questionSlice';
const baseUrl = 'http://localhost:8080/';
export const apiGetQuestionDetail = async (
  questionId: number,
): ApiResponse<Question> => {
  try {
    const response = await axiosService.get(
      `${baseUrl}TEACHER/api/question/detail/${questionId}`,
    );
    return { data: response.data };
  } catch (error) {
    return {
      error: new Failure(error.response.data.message, error.response.status),
    };
  }
};

export const getQuestionDetail = createAsyncThunk(
  'question/getQuestionDetail',
  async (questionId: number) => {
    return await apiGetQuestionDetail(questionId);
  },
);

const handleGetQuestionDetail = (
  builder: ActionReducerMapBuilder<QuestionState>,
) => {
  builder
    .addCase(getQuestionDetail.pending, (state) => {
      state.questionDetailPage.status = 'loading';
    })
    .addCase(getQuestionDetail.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.questionDetailPage.status = 'failed';
        state.questionDetailPage.error = action.payload.error.message;
      } else {
        state.questionDetailPage.status = 'succeeded';
        state.questionDetailPage.data = action.payload.data;
      }
    })
    .addCase(getQuestionDetail.rejected, (state, action) => {
      state.questionDetailPage.status = 'failed';
      state.questionDetailPage.error = action.error.message;
    });
};

export default handleGetQuestionDetail;
