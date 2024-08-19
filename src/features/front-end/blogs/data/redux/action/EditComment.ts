import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import ApiResponse from '../../../../../../common/entities/ApiResponse';
import { BlogComment } from '../../../../../../common/entities/BlogComment';
import Failure from '../../../../../../common/entities/Failure';
import axiosService from '../../../../../../common/services/axiosService';
import { BlogState } from '../blogUISlice';

export type UpdateCommentReq = {
  text: string;
};

const baseUrl = 'http://localhost:8080/';
export const apiUpdateBlog = async (
  req: UpdateCommentReq,
  id: number,
): ApiResponse<BlogComment> => {
  try {
    const response = await axiosService.put(
      `${baseUrl}api/blog_comment/${id}`,
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

export const editComment = createAsyncThunk(
  'ui/blog/createBlog',
  async ({ id, req }: { id: number; req: UpdateCommentReq }) => {
    const response = await apiUpdateBlog(req, id);
    console.log(response);
    return response;
  },
);

export const createBlogCommentExtraReducers = (
  builder: ActionReducerMapBuilder<BlogState>,
) => {
  builder
    .addCase(editComment.pending, (state) => {
      state.updateCommentState.status = 'loading';
    })
    .addCase(editComment.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.updateCommentState.status = 'failed';
        state.updateCommentState.error = action.payload.error?.message;
        state.updateCommentState.errors = action.payload.error?.errors;
      } else {
        state.updateCommentState.status = 'succeeded';
        state.updateCommentState.data = action.payload.data;
      }
    });
};
