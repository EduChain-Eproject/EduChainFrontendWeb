import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import ApiResponse from '../../../../../../common/entities/ApiResponse';
import Failure from '../../../../../../common/entities/Failure';
import { UserAnswer } from '../../../../../../common/entities/UserAnswer';
import axiosService from '../../../../../../common/services/axiosService';
import { CourseState } from '../redux/courseSlice';

export interface AnswerQuestionReq {
  homeworkId: number;
  questionId: number;
  answerId: number;
}

const apiAnswerAQuestion = async (
  req: AnswerQuestionReq,
): ApiResponse<UserAnswer> => {
  try {
    const response = await axiosService.post(
      `/STUDENT/api/homework/answer/${req.homeworkId}`,
      req,
    );
    return { data: response.data };
  } catch (error) {
    return {
      error: new Failure(error.response.data.message, error.response.status),
    };
  }
};

export const answerAQuestion = createAsyncThunk(
  'homework/answerAQuestion',
  async (req: AnswerQuestionReq) => {
    return await apiAnswerAQuestion(req);
  },
);

const handleAnswerAQuestion = (
  builder: ActionReducerMapBuilder<CourseState>,
) => {
  builder
    .addCase(answerAQuestion.pending, (state) => {
      state.homeworkDetailComponent.status = 'loading';
    })
    .addCase(answerAQuestion.fulfilled, (state, action) => {
      state.homeworkDetailComponent.status = 'succeeded';

      if (state.homeworkDetailComponent.data && !action.payload.error) {
        state.homeworkDetailComponent.data = {
          ...state.homeworkDetailComponent.data,
          questionDtos: state.homeworkDetailComponent.data.questionDtos?.map(
            (q) => {
              if (
                q.currentUserAnswerDto &&
                action.payload.data &&
                q.id == action.payload.data.questionId
              ) {
                q = {
                  ...q,
                  currentUserAnswerDto: action.payload.data,
                };
              }
              return q;
            },
          ),
        };
      } else {
        state.homeworkDetailComponent.error = action.payload.error?.message;
      }
    })
    .addCase(answerAQuestion.rejected, (state, action) => {
      state.homeworkDetailComponent.status = 'failed';
      state.homeworkDetailComponent.error = action.payload as string;
    });
};

export default handleAnswerAQuestion;
