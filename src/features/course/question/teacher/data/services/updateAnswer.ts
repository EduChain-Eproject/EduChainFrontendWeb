import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import ApiResponse from '../../../../../../common/entities/ApiResponse';
import Failure from '../../../../../../common/entities/Failure';
import { Answer } from '../../../../../../common/entities/Answer';
import axiosService from '../../../../../../common/services/axiosService';
import { QuestionState } from '../redux/questionSlice';

export interface UpdateAnswerReq {
  answerId: number;
  answerText: string;
}
const baseUrl = 'http://localhost:8080/';
export const apiUpdateAnswer = async (
  answerData: UpdateAnswerReq,
): ApiResponse<Answer> => {
  try {
    const response = await axiosService.put(
      `${baseUrl}TEACHER/api/answer/update/${answerData.answerId}`,
      {
        answerText: answerData.answerText,
      },
    );
    return { data: response.data };
  } catch (error) {
    return {
      error: new Failure(error.response.data.message, error.response.status),
    };
  }
};

export const updateAnswer = createAsyncThunk(
  'answer/updateAnswer',
  async (answerData: UpdateAnswerReq) => {
    return await apiUpdateAnswer(answerData);
  },
);

const handleUpdateAnswer = (
  builder: ActionReducerMapBuilder<QuestionState>,
) => {
  builder
    .addCase(updateAnswer.pending, (state) => {
      state.questionDetailPage.status = 'updating answer';
    })
    .addCase(updateAnswer.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.questionDetailPage.status = 'update answer failed';
        state.questionDetailPage.error = action.payload.error.message;
      } else {
        state.questionDetailPage.status = 'update answer succeeded';
        if (state.questionDetailPage.data && action.payload.data) {
          const updatedAnswers = state.questionDetailPage.data.answerDtos?.map(
            (a) => {
              if (a.id == action.payload.data?.id) {
                a.answerText = action.payload.data.answerText;
              }
              return a;
            },
          );

          state.questionDetailPage.data = {
            ...state.questionDetailPage.data,
            answerDtos: updatedAnswers,
          };
        }
      }
    })
    .addCase(updateAnswer.rejected, (state, action) => {
      state.questionDetailPage.status = 'update answer failed';
      state.questionDetailPage.error = action.error.message;
    });
};

export default handleUpdateAnswer;
