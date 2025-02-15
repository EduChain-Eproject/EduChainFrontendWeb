import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import axiosService from '../../../../../../common/services/axiosService';
import { Blog } from '../../model/Blog';
import { BlogState } from '../blogUISlice';
import ApiResponse from '../../../../../../common/entities/ApiResponse';
import Failure from '../../../../../../common/entities/Failure';

export type FilterBlogReq = {
  page: number;
  size?: number;
  keyword?: string;
  sortStrategy?: string;
  categoryIds?: number[];
};

export const apiFilterBlog = async (
  data: FilterBlogReq,
): Promise<{
  totalPages: number;
  totalElements: number;
  content: Blog[];
  error?: {
    message: string;
    errors: { [key: string]: string };
    timestamp?: string;
  };
}> => {
  try {
    const queryParams = new URLSearchParams(data as any).toString();

    const response = await axiosService.post(
      `http://localhost:8080/api/blog/filter`,
      data,
    );
    console.log(response);
    return response.data;
  } catch (error) {
    if (error.response) {
      const data = error.response.data;
      const message = data.errors.message || 'Validation error';
      const errors = data.errors;
      return {
        totalPages: 0,
        totalElements: 0,
        content: [],
        error: new Failure(message, errors, data.timestamp),
      };
    }
    return {
      totalPages: 0,
      totalElements: 0,
      content: [],
      error: new Failure('message', {}, ''),
    };
  }
};

export const filterBlog = createAsyncThunk(
  'ui/blog/filterBlog',
  async (data: FilterBlogReq) => {
    const response = await apiFilterBlog(data);
    console.log(response);

    return response;
  },
);

export const filterBlogExtraReducers = (
  builder: ActionReducerMapBuilder<BlogState>,
) => {
  builder
    .addCase(filterBlog.pending, (state) => {
      state.filterState.status = 'loading';
    })
    .addCase(filterBlog.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.filterState.status = 'failed';
        state.filterState.error = action.payload.error.message;
      } else {
        state.filterState.status = 'succeeded';
        console.log(action.payload.content);
        if (action.payload.content) {
          state.filterState.data = action.payload.content;
          console.log('suc');
          console.log(state.filterState.data);
          state.pagination.totalPages = action.payload.totalPages;
          state.pagination.totalElements = action.payload.totalElements;
        }
      }
    })
    .addCase(filterBlog.rejected, (state, action) => {
      state.filterState.status = 'failed';
      state.filterState.error = action.error.message;
    });
};
