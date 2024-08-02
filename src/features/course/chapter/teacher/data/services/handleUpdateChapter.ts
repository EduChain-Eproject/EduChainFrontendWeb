import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';

import Chapter from '../../../../../../common/entities/Chapter';
import ApiResponse from '../../../../../../common/entities/ApiResponse';
import Failure from '../../../../../../common/entities/Failure';
import axiosService from '../../../../../../common/services/axiosService';
import { ChapterState } from '../redux/chapterSlice';

export type UpdateChapterReq = {
  chapterTitle: string;
};
const baseUrl = 'http://localhost:8080/';
export const apiUpdateChapter = async (
  chapterId: number,
  chapterData: UpdateChapterReq,
): ApiResponse<Chapter> => {
  try {
    console.log(chapterData);
    console.log(chapterId);
    const response = await axiosService.put(
      `${baseUrl}TEACHER/api/chapter/update/${chapterId}`,
      chapterData,
    );
    return { data: response.data };
  } catch (error) {
    console.log(error);
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

export const updateChapter = createAsyncThunk(
  'chapters/updateChapter',
  async ({
    chapterId,
    chapterData,
  }: {
    chapterId: number;
    chapterData: UpdateChapterReq;
  }) => {
    return await apiUpdateChapter(chapterId, chapterData);
  },
);

const handleUpdateChapter = (
  builder: ActionReducerMapBuilder<ChapterState>,
) => {
  builder
    .addCase(updateChapter.pending, (state) => {
      state.updateChapterPage.status = 'loading';
    })
    .addCase(updateChapter.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.updateChapterPage.status = 'failed';
        state.updateChapterPage.error = action.payload.error.message;
        state.updateChapterPage.errors = action.payload.error.errors;
        console.log(state.updateChapterPage.errors);
      } else {
        state.updateChapterPage.status = 'succeeded';
        state.updateChapterPage.data = action.payload.data;
      }
    })
    .addCase(updateChapter.rejected, (state, action) => {
      state.updateChapterPage.status = 'failed';
      state.updateChapterPage.error = action.error.message;
    });
};

export default handleUpdateChapter;
