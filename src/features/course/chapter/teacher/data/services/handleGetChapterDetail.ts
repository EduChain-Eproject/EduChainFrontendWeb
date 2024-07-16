import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';

import Chapter from '../../../../../../common/entities/Chapter';
import ApiResponse from '../../../../../../common/entities/ApiResponse';
import Failure from '../../../../../../common/entities/Failure';
import axiosService from '../../../../../../common/services/axiosService';
import { ChapterState } from '../redux/courseSlice';

export const apiGetChapterDetail = async (
  chapterId: number,
): ApiResponse<Chapter> => {
  try {
    const response = await axiosService.get(
      `/TEACHER/api/chapter/detail/${chapterId}`,
    );
    return { data: response.data };
  } catch (error) {
    return {
      error: new Failure(error.response.data.message, error.response.status),
    };
  }
};

export const getChapterDetail = createAsyncThunk(
  'chapters/getChapterDetail',
  async (chapterId: number) => {
    return await apiGetChapterDetail(chapterId);
  },
);

const handleGetChapterDetail = (
  builder: ActionReducerMapBuilder<ChapterState>,
) => {
  builder
    .addCase(getChapterDetail.pending, (state) => {
      state.chapterDetailPage.status = 'loading';
    })
    .addCase(getChapterDetail.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.chapterDetailPage.status = 'failed';
        state.chapterDetailPage.error = action.payload.error.message;
      } else {
        state.chapterDetailPage.status = 'succeeded';
        state.chapterDetailPage.data = action.payload.data;
      }
    })
    .addCase(getChapterDetail.rejected, (state, action) => {
      state.chapterDetailPage.status = 'failed';
      state.chapterDetailPage.error = action.error.message;
    });
};

export default handleGetChapterDetail;
