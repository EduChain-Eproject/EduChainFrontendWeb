import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Homework } from '../../../../../../common/entities/Homework';
import { Question } from '../../../../../../common/entities/Question';
import {
  CommonState,
  initCommonState,
} from '../../../../../../common/state/index';
import handleCreateHomework from '../services/createHomework';
import handleDeleteHomework from '../services/deleteHomework';
import handleGetHomeworkDetail from '../services/getHomeworkDetail';
// import handleGetHomeWorkQuestions from '../services/getHomeworkQuestions';

import handleUpdateHomework from '../services/updateHomework';

export interface HomeworkState {
  homeworkDetailPage: CommonState<Homework>;
  createHomeworkPage: CommonState<Homework>;
  updateHomeworkPage: CommonState<Homework>;
  deleteHomeworkPage: CommonState<number>;
  // homeworkQuestionsPage: CommonState<Question[]>;
}

const initialState: HomeworkState = {
  homeworkDetailPage: initCommonState,
  createHomeworkPage: initCommonState,
  updateHomeworkPage: initCommonState,
  deleteHomeworkPage: initCommonState,
  // homeworkQuestionsPage: initCommonState,
};

const homeworkSlice = createSlice({
  name: 'homework',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleCreateHomework(builder);
    handleGetHomeworkDetail(builder);
    handleUpdateHomework(builder);
    handleDeleteHomework(builder);
  },
});

export default homeworkSlice.reducer;
