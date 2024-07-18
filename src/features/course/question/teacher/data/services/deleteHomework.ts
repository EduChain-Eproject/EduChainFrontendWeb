import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import ApiResponse from '../../../../../../common/entities/ApiResponse';
import Failure from '../../../../../../common/entities/Failure';
import { Question } from '../../../../../../common/entities/Question';
import axiosService from '../../../../../../common/services/axiosService';
import { QuestionState } from '../redux/questionSlice';

export const apiDeleteQuestion = async (
  questionId: number,
): ApiResponse<number> => {
  try {
    const response = await axiosService.delete(
      `/TEACHER/api/question/delete/${questionId}`,
    );
    return { data: response.data };
  } catch (error) {
    return {
      error: new Failure(error.response.data.message, error.response.status),
    };
  }
};

export const deleteQuestion = createAsyncThunk(
  'question/deleteQuestion',
  async (questionId: number) => {
    return await apiDeleteQuestion(questionId);
  },
);

const handleDeleteQuestion = (
  builder: ActionReducerMapBuilder<QuestionState>,
) => {
  builder
    .addCase(deleteQuestion.pending, (state) => {
      state.questionDetailPage.status = 'loading';
    })
    .addCase(deleteQuestion.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.questionDetailPage.status = 'failed';
        state.questionDetailPage.error = action.payload.error.message;
      } else {
        state.questionDetailPage.status = 'succeeded';
        state.deleteQuestionPage.data = action.payload.data;
      }
    })
    .addCase(deleteQuestion.rejected, (state, action) => {
      state.questionDetailPage.status = 'failed';
      state.questionDetailPage.error = action.error.message;
    });
};

export default handleDeleteQuestion;
