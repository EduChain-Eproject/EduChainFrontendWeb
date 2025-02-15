import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import ApiResponse from '../../../../../../common/entities/ApiResponse';
import { BlogComment } from '../../../../../../common/entities/BlogComment';
import Failure from '../../../../../../common/entities/Failure';
import axiosService from '../../../../../../common/services/axiosService';
import { BlogState } from '../blogUISlice';

const baseUrl = 'http://localhost:8080/';
export const apiCreateBlog = async (id: number): ApiResponse<BlogComment> => {
  try {
    const response = await axiosService.delete(
      `${baseUrl}api/blog_comment/${id}`,
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

export const deleteComment = createAsyncThunk(
  'ui/blog/createBlog',
  async (id: number) => {
    const response = await apiCreateBlog(id);
    console.log(response);
    return response;
  },
);

export const createBlogCommentExtraReducers = (
  builder: ActionReducerMapBuilder<BlogState>,
) => {
  builder
    .addCase(deleteComment.pending, (state) => {
      state.delteteCommentState.status = 'loading';
    })
    .addCase(deleteComment.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.delteteCommentState.status = 'failed';
        state.delteteCommentState.error = action.payload.error?.message;
        state.delteteCommentState.errors = action.payload.error?.errors;
      } else {
        state.delteteCommentState.status = 'succeeded';
      }
    });
};
