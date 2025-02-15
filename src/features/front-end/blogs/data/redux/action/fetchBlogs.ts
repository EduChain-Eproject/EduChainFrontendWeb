import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import axiosService from '../../../../../../common/services/axiosService';
import { BlogState } from '../blogUISlice';
import { Blog } from '../../model/Blog';
import Failure from '../../../../../../common/entities/Failure';
const baseUrl = 'http://localhost:8080/';

export type FindAllBlogRequest = {
  page: number;
  size: number;
  sortBy: string;
};

export const apiFetchBlogs = async (
  req: FindAllBlogRequest,
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
    const response = await axiosService.post(`${baseUrl}api/blog/fetch`, req);
    return response.data;
  } catch (error) {
    if (error.response) {
      const data = error.response.data;
      const message = data.errors.message || 'Validation error';
      const errors = data.errors;

      throw new Failure(message, errors, data.timestamp);
    }
    throw new Failure('An unknown error occurred', {
      message: 'An unknown error occurred',
    });
  }
};

export const fetchBlogs = createAsyncThunk(
  '/ui/blog/fetchBlogs',
  async (req: FindAllBlogRequest) => {
    const response = await apiFetchBlogs(req);
    console.log(response);

    return response;
  },
);

export const fetchBlogsExtraReducers = (
  builder: ActionReducerMapBuilder<BlogState>,
) => {
  builder
    .addCase(fetchBlogs.pending, (state) => {
      state.blogs.status = 'loading';
    })
    .addCase(fetchBlogs.fulfilled, (state, action) => {
      state.blogs.status = 'succeeded';
      state.blogs.data = action.payload.content;
      state.pagination.totalPages = action.payload.totalPages;
      state.pagination.totalElements = action.payload.totalElements;
    })
    .addCase(fetchBlogs.rejected, (state, action) => {
      state.blogs.status = 'failed';
      state.blogs.error = action.error.message;
    });
};
