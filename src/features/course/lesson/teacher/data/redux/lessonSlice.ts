import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import Lesson from '../../../../../../common/entities/Lesson';
import { CommonState, initCommonState } from '../../../../../../common/state';
import handleCreateLesson from '../services/handleCreateLesson';
import handleDeleteLesson from '../services/handleDeleteLesson';
import handleGetLessonDetail from '../services/handleGetLessonDetail';
import handleUpdateLesson from '../services/handleUpdateLesson';

export interface LessonState {
  lessonDetailPage: CommonState<Lesson>;
  updateLessonPage: CommonState<Lesson>;
  deleteLessonPage: CommonState<number>;
  createLessonPage: CommonState<Lesson>;
}

const initialState: LessonState = {
  lessonDetailPage: initCommonState,
  updateLessonPage: initCommonState,
  deleteLessonPage: initCommonState,
  createLessonPage: initCommonState,
};

const lessonSlice = createSlice({
  name: 'lessons',
  initialState,
  reducers: {
    homeworkDeleted(state, action) {
      console.log('deleted, filtering');

      const deletedLessonId = action.payload;
      if (state.lessonDetailPage.data?.homeworkDtos) {
        const filteredLessons = state.lessonDetailPage.data.homeworkDtos.filter(
          (homework) => homework.id !== deletedLessonId,
        );
        state.lessonDetailPage.data = {
          ...state.lessonDetailPage.data,
          homeworkDtos: filteredLessons,
        };
      }
    },
  },
  extraReducers: (builder) => {
    handleGetLessonDetail(builder);
    handleUpdateLesson(builder);
    handleDeleteLesson(builder);
    handleCreateLesson(builder);
  },
});

export const { homeworkDeleted } = lessonSlice.actions;

export default lessonSlice.reducer;
