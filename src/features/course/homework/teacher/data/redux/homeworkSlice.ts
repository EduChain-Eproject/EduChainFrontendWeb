import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Homework } from '../../../../../../common/entities/Homework';
import {
  CommonState,
  initCommonState,
} from '../../../../../../common/state/index';
import handleCreateHomework from '../services/createHomework';
import handleDeleteHomework from '../services/deleteHomework';
import handleGetHomeworkDetail from '../services/getHomeworkDetail';

import handleUpdateHomework from '../services/updateHomework';

export interface HomeworkState {
  homeworkDetailPage: CommonState<Homework>;
  createHomeworkPage: CommonState<Homework>;
  updateHomeworkPage: CommonState<Homework>;
  deleteHomeworkPage: CommonState<number>;
}

const initialState: HomeworkState = {
  homeworkDetailPage: initCommonState,
  createHomeworkPage: initCommonState,
  updateHomeworkPage: initCommonState,
  deleteHomeworkPage: initCommonState,
};

const homeworkSlice = createSlice({
  name: 'homework',
  initialState,
  reducers: {
    questionDeleted(state, action) {
      const deletedLessonId = action.payload;
      if (state.homeworkDetailPage.data?.questionDtos) {
        const filteredLessons =
          state.homeworkDetailPage.data.questionDtos.filter(
            (question) => question.id !== deletedLessonId,
          );
        state.homeworkDetailPage.data = {
          ...state.homeworkDetailPage.data,
          questionDtos: filteredLessons,
        };
      }
    },
  },
  extraReducers: (builder) => {
    handleCreateHomework(builder);
    handleGetHomeworkDetail(builder);
    handleUpdateHomework(builder);
    handleDeleteHomework(builder);
  },
});

export const { questionDeleted } = homeworkSlice.actions;
export default homeworkSlice.reducer;
