import {
  ActionReducerMapBuilder,
  createAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';

import Chapter from '../../../../../../common/entities/Chapter';
import ApiResponse from '../../../../../../common/entities/ApiResponse';
import Failure from '../../../../../../common/entities/Failure';
import axiosService from '../../../../../../common/services/axiosService';
import { ChapterState } from '../redux/chapterSlice';

export type CreateChapterReq = {
  courseId: number;
  chapterTitle: string;
};
const baseUrl = 'http://localhost:8080/';
export const apiCreateChapter = async (
  chapterData: CreateChapterReq,
): ApiResponse<Chapter> => {
  try {
    const response = await axiosService.post(
      `${baseUrl}TEACHER/api/chapter/create`,
      chapterData,
    );
    return { data: response.data };
  } catch (error) {
    if (error.response) {
      const data = error.response.data;
      const message = data.errors.message || 'Validation error';
      const errors = data.errors;
      return {
        error: new Failure(message, errors, data.timestamp),
      };
    }
    return {
      error: new Failure('message', {}, ''),
    };
  }
};

export const createChapter = createAsyncThunk(
  'chapters/createChapter',
  async (chapterData: CreateChapterReq) => {
    return await apiCreateChapter(chapterData);
  },
);

export const resetcreateChapterStatus = createAction(
  'userProfile/resetcreateChapterStatus',
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
        state.createChapterPage.errors = action.payload.error.errors;
        console.log(state.createChapterPage.errors);
      } else {
        state.createChapterPage.status = 'succeeded';
        state.createChapterPage.data = action.payload.data;
      }
    })
    .addCase(createChapter.rejected, (state, action) => {
      state.createChapterPage.status = 'failed';
      state.createChapterPage.error = action.error.message;
    })
    .addCase(resetcreateChapterStatus, (state) => {
      state.createChapterPage = {
        status: 'idle',
        data: undefined,
        error: undefined,
        errors: undefined,
      };
    });
};

export default handleCreateChapter;
