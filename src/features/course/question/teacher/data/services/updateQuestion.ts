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

export const apiUpdateQuestion = async (
  questionData: UpdateQuestionReq,
): ApiResponse<Question> => {
  console.log(questionData);

  try {
    const response = await axiosService.put(
      `/TEACHER/api/question/update/${questionData.questionId}`,
      {
        questionText: questionData.questionText,
        correctAnswerId: questionData.correctAnswerId,
      },
    );
    return { data: response.data };
  } catch (error) {
    return {
      error: new Failure(error.response.data.message, error.response.status),
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
      state.questionDetailPage.status = 'updating question';
    })
    .addCase(updateQuestion.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.questionDetailPage.status = 'update question failed';
        state.questionDetailPage.error = action.payload.error.message;
      } else {
        state.questionDetailPage.status = 'update question succeeded';
        if (state.questionDetailPage.data && action.payload.data) {
          state.questionDetailPage.data = action.payload.data;
        }
      }
    })
    .addCase(updateQuestion.rejected, (state, action) => {
      state.questionDetailPage.status = 'update question failed';
      state.questionDetailPage.error = action.error.message;
    });
};

export default handleUpdateQuestion;
