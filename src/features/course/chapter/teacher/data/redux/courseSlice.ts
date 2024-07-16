import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Chapter from '../../../../../../common/entities/Chapter';

import { CommonState, initCommonState } from '../../../../../../common/state';
import {
  handleCreateChapter,
  handleDeleteChapter,
  handleGetChapterDetail,
  handleUpdateChapter,
} from './actionHandlings';

export interface ChapterState {
  chapterDetailPage: CommonState<Chapter>;
  updateChapterPage: CommonState<Chapter>;
  deleteChapterPage: CommonState<number>;
  createChapterPage: CommonState<Chapter>;
}

const initialState: ChapterState = {
  chapterDetailPage: initCommonState,
  updateChapterPage: initCommonState,
  deleteChapterPage: initCommonState,
  createChapterPage: initCommonState,
};

const teacherChapterSlice = createSlice({
  name: 'chapters',
  initialState,
  reducers: {
    lessonDeleted(state, action) {
      const deletedLessonId = action.payload;
      if (state.chapterDetailPage.data?.lessonDtos) {
        const filteredLessons = state.chapterDetailPage.data.lessonDtos.filter(
          (lesson) => lesson.id !== deletedLessonId,
        );
        state.chapterDetailPage.data = {
          ...state.chapterDetailPage.data,
          lessonDtos: filteredLessons,
        };
      }
    },
  },
  extraReducers: (builder) => {
    handleGetChapterDetail(builder);
    handleUpdateChapter(builder);
    handleDeleteChapter(builder);
    handleCreateChapter(builder);
  },
});

export const { lessonDeleted } = teacherChapterSlice.actions;
export default teacherChapterSlice.reducer;
