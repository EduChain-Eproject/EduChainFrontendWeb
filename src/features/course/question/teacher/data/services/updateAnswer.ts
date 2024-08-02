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
    if (error.response) {
      const data = error.response.data;
      const message = data.errors.message || 'Validation error';
      const errors = data.errors;
      console.log(data.errors);
      return {
        error: new Failure(message, errors, data.timestamp),
      };
    }
    console.log('err');
    return {
      error: new Failure('message', {}, ''),
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
      state.updateAnswer.status = 'updating answer';
    })
    .addCase(updateAnswer.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.updateAnswer.status = 'update answer failed';
        state.updateAnswer.error = action.payload.error.message;
        state.updateAnswer.errors = action.payload.error.errors;
        console.log('err');
      } else {
        state.updateAnswer.status = 'update answer succeeded';
        console.log('succ');
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
      console.log(action.payload);

      state.updateAnswer.status = 'update answer failed';
      state.updateAnswer.error = action.error.message;
    });
};

export default handleUpdateAnswer;
