import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import ApiResponse from '../../../../../../common/entities/ApiResponse';
import Failure from '../../../../../../common/entities/Failure';
import { Question } from '../../../../../../common/entities/Question';
import axiosService from '../../../../../../common/services/axiosService';
import { QuestionState } from '../redux/questionSlice';

export interface CreateQuestionReq {
  homeworkId: number;
  questionText: string;
  answerTexts: string[];
  correctAnswerIndex: number;
}

export const apiCreateQuestion = async (
  questionData: CreateQuestionReq,
): ApiResponse<Question> => {
  try {
    const response = await axiosService.post(
      `/TEACHER/api/question/create`,
      questionData,
    );
    return { data: response.data };
  } catch (error) {
    return {
      error: new Failure(error.response.data.message, error.response.status),
    };
  }
};

export const createQuestion = createAsyncThunk(
  'question/createQuestion',
  async (questionData: CreateQuestionReq) => {
    return await apiCreateQuestion(questionData);
  },
);

const handleCreateQuestion = (
  builder: ActionReducerMapBuilder<QuestionState>,
) => {
  builder
    .addCase(createQuestion.pending, (state) => {
      state.createQuestionPage.status = 'loading';
    })
    .addCase(createQuestion.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.createQuestionPage.status = 'failed';
        state.createQuestionPage.error = action.payload.error.message;
      } else {
        state.createQuestionPage.status = 'succeeded';
        state.createQuestionPage.data = action.payload.data;
      }
    })
    .addCase(createQuestion.rejected, (state, action) => {
      state.createQuestionPage.status = 'failed';
      state.createQuestionPage.error = action.error.message;
    });
};

export default handleCreateQuestion;
