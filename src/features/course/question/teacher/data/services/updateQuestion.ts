import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import ApiResponse from '../../../../../../common/entities/ApiResponse';
import Failure from '../../../../../../common/entities/Failure';
import { Question } from '../../../../../../common/entities/Question';
import axiosService from '../../../../../../common/services/axiosService';
import { QuestionState } from '../redux/questionSlice';

export interface UpdateQuestionReq {
  questionId: number;
  questionText: string;
  correctAnswerId: number;
}
const baseUrl = 'http://localhost:8080/';
export const apiUpdateQuestion = async (
  questionData: UpdateQuestionReq,
): ApiResponse<Question> => {
  console.log(questionData);

  try {
    const response = await axiosService.put(
      `${baseUrl}TEACHER/api/question/update/${questionData.questionId}`,
      {
        questionText: questionData.questionText,
        correctAnswerId: questionData.correctAnswerId,
      },
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
export const updateQuestion = createAsyncThunk(
  'question/updateQuestion',
  async (questionData: UpdateQuestionReq) => {
    return await apiUpdateQuestion(questionData);
  },
);

const handleUpdateQuestion = (
  builder: ActionReducerMapBuilder<QuestionState>,
) => {
  builder
    .addCase(updateQuestion.pending, (state) => {
      state.updateQuestionPage.status = 'updating question';
    })
    .addCase(updateQuestion.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.updateQuestionPage.status = 'update question failed';
        state.updateQuestionPage.error = action.payload.error.message;
        state.updateQuestionPage.errors = action.payload.error.errors;
      } else {
        state.updateQuestionPage.status = 'update question succeeded';
        if (state.updateQuestionPage.data && action.payload.data) {
          state.updateQuestionPage.data = action.payload.data;
        }
      }
    })
    .addCase(updateQuestion.rejected, (state, action) => {
      state.updateQuestionPage.status = 'update question failed';
      state.updateQuestionPage.error = action.error.message;
    });
};

export default handleUpdateQuestion;
