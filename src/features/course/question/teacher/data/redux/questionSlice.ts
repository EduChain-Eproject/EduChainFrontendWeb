import { updateAnswer } from './../services/updateAnswer';
import { createSlice, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { Question } from '../../../../../../common/entities/Question';
import handleCreateQuestion from '../services/createQuestion';
import handleUpdateQuestion from '../services/updateQuestion';
// import handleGetQuestionDetail from '../services/getQuestionDetail'; // Assume this exists
import { CommonState, initCommonState } from '../../../../../../common/state';
import handleDeleteQuestion from '../services/deleteHomework';
import handleGetQuestionDetail from '../services/getQuestionDetail';
import handleUpdateAnswer from '../services/updateAnswer';
import { Answer } from '../../../../../../common/entities/Answer';

export interface QuestionState {
  questionDetailPage: CommonState<Question>;
  createQuestionPage: CommonState<Question>;
  updateQuestionPage: CommonState<Question>;
  deleteQuestionPage: CommonState<number>;
  updateAnswer: CommonState<Answer>;
}

const initialState: QuestionState = {
  questionDetailPage: initCommonState,
  createQuestionPage: initCommonState,
  deleteQuestionPage: initCommonState,
  updateQuestionPage: initCommonState,
  updateAnswer: initCommonState,
};

const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleCreateQuestion(builder);
    handleGetQuestionDetail(builder);
    handleUpdateQuestion(builder);
    handleDeleteQuestion(builder);
    handleUpdateAnswer(builder);
  },
});

export default questionSlice.reducer;
