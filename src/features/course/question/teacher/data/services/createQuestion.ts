import { ActionReducerMapBuilder, createAction, createAsyncThunk } from '@reduxjs/toolkit';
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
const baseUrl = 'http://localhost:8080/';
export const apiCreateQuestion = async (
  questionData: CreateQuestionReq,
): ApiResponse<Question> => {
  try {
    const response = await axiosService.post(
      `${baseUrl}TEACHER/api/question/create`,
      questionData,
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

export const createQuestion = createAsyncThunk(
  'question/createQuestion',
  async (questionData: CreateQuestionReq) => {
    return await apiCreateQuestion(questionData);
  },
);
export const resetcreateQuestionStatus = createAction(
  'userProfile/resetcreateChapterStatus',
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
        state.createQuestionPage.errors = action.payload.error.errors;
      } else {
        state.createQuestionPage.status = 'succeeded';
        state.createQuestionPage.data = action.payload.data;
      }
    })
    .addCase(createQuestion.rejected, (state, action) => {
      state.createQuestionPage.status = 'failed';
      state.createQuestionPage.error = action.error.message;
    }).addCase(resetcreateQuestionStatus, (state) => {
      state.createQuestionPage.status = 'idle';
      state.createQuestionPage.error = undefined;
      state.createQuestionPage.data = undefined;
      state.createQuestionPage.errors = undefined;
    });
};

export default handleCreateQuestion;
