import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';

import Chapter from '../../../../../../common/entities/Chapter';
import ApiResponse from '../../../../../../common/entities/ApiResponse';
import Failure from '../../../../../../common/entities/Failure';
import axiosService from '../../../../../../common/services/axiosService';
import { ChapterState } from '../redux/chapterSlice';

export type CreateChapterReq = {
  courseId: number;
  chapterTitle: string;
};

export const apiCreateChapter = async (
  chapterData: CreateChapterReq,
): ApiResponse<Chapter> => {
  try {
    const response = await axiosService.post(
      `/TEACHER/api/chapter/create`,
      chapterData,
    );
    return { data: response.data };
  } catch (error) {
    return {
      error: new Failure(error.response.data.message, error.response.status),
    };
  }
};

export const createChapter = createAsyncThunk(
  'chapters/createChapter',
  async (chapterData: CreateChapterReq) => {
    return await apiCreateChapter(chapterData);
  },
);

const handleCreateChapter = (
  builder: ActionReducerMapBuilder<ChapterState>,
) => {
  builder
    .addCase(createChapter.pending, (state) => {
      state.createChapterPage.status = 'loading';
    })
    .addCase(createChapter.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.createChapterPage.status = 'failed';
        state.createChapterPage.error = action.payload.error.message;
      } else {
        state.createChapterPage.status = 'succeeded';
        state.createChapterPage.data = action.payload.data;
      }
    })
    .addCase(createChapter.rejected, (state, action) => {
      state.createChapterPage.status = 'failed';
      state.createChapterPage.error = action.error.message;
    });
};

export default handleCreateChapter;
