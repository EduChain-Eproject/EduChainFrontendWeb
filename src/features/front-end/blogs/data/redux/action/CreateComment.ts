import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import ApiResponse from '../../../../../../common/entities/ApiResponse';
import { BlogComment } from '../../../../../../common/entities/BlogComment';
import Failure from '../../../../../../common/entities/Failure';
import axiosService from '../../../../../../common/services/axiosService';
import { BlogState } from '../blogUISlice';

export type CreateBlogCommentReq = {
  text: string;
  parentCommentId: string;
  blogId: number;
};

const baseUrl = 'http://localhost:8080/';
export const apiCreateBlog = async (
  req: CreateBlogCommentReq,
): ApiResponse<BlogComment> => {
  try {
    const response = await axiosService.post(
      `${baseUrl}api/blog_comment/create`,
      req,
    );
    console.log(response.data);
    return response.data;
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

export const createComment = createAsyncThunk(
  'ui/blog/createBlog',
  async (req: CreateBlogCommentReq) => {
    const response = await apiCreateBlog(req);
    console.log(response);
    return response;
  },
);

export const createBlogCommentExtraReducers = (
  builder: ActionReducerMapBuilder<BlogState>,
) => {
  builder
    .addCase(createComment.pending, (state) => {
      state.createCommentState.status = 'loading';
    })
    .addCase(createComment.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.createCommentState.status = 'failed';
        state.createCommentState.error = action.payload.error?.message;
        state.createCommentState.errors = action.payload.error?.errors;
      } else {
        state.createCommentState.status = 'succeeded';
        state.createCommentState.data = action.payload.data;
      }
    });
};
