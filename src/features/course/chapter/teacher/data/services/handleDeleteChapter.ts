import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';

import Chapter from '../../../../../../common/entities/Chapter';
import ApiResponse from '../../../../../../common/entities/ApiResponse';
import Failure from '../../../../../../common/entities/Failure';
import axiosService from '../../../../../../common/services/axiosService';
import { ChapterState } from '../redux/courseSlice';

export const apiDeleteChapter = async (
  chapterId: number,
): ApiResponse<number> => {
  try {
    const response = await axiosService.delete(
      `/TEACHER/api/chapter/delete/${chapterId}`,
    );
    return { data: response.data };
  } catch (error) {
    return {
      error: new Failure(error.response.data.message, error.response.status),
    };
  }
};

export const deleteChapter = createAsyncThunk(
  'chapters/deleteChapter',
  async (chapterId: number) => {
    return await apiDeleteChapter(chapterId);
  },
);

const handleDeleteChapter = (
  builder: ActionReducerMapBuilder<ChapterState>,
) => {
  builder
    .addCase(deleteChapter.pending, (state) => {
      state.deleteChapterPage.status = 'loading';
    })
    .addCase(deleteChapter.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.deleteChapterPage.status = 'failed';
        state.deleteChapterPage.error = action.payload.error.message;
      } else {
        state.deleteChapterPage.status = 'succeeded';
        state.deleteChapterPage.data = action.payload.data;
      }
    })
    .addCase(deleteChapter.rejected, (state, action) => {
      state.deleteChapterPage.status = 'failed';
      state.deleteChapterPage.error = action.error.message;
    });
};

export default handleDeleteChapter;
