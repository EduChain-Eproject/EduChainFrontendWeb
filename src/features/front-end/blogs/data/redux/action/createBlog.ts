import {
  createAsyncThunk,
  ActionReducerMapBuilder,
  createAction,
} from '@reduxjs/toolkit';
import axiosService from '../../../../../../common/services/axiosService';
import Failure from '../../../../../../common/entities/Failure';
import { BlogState } from '../blogUISlice';
import { Blog } from '../../model/Blog';
import ApiResponse from '../../../../../../common/entities/ApiResponse';

export type CreateBlogReq = {
  title: string;
  userId: number;
  blogCategoryId: number;
  blogText: string;
  photo: File | null;
};

const toFormData = (blogData: CreateBlogReq): FormData => {
  const formData = new FormData();
  formData.append('title', blogData.title);
  formData.append('userId', blogData.userId.toString());
  formData.append('blogCategoryId', blogData.blogCategoryId.toString());
  formData.append('blogText', blogData.blogText);
  if (blogData.photo) {
    formData.append('photo', blogData.photo);
  }
  return formData;
};
const baseUrl = 'http://localhost:8080/';
export const apiCreateBlog = async (
  blogData: CreateBlogReq,
): ApiResponse<Blog> => {
  const formData = toFormData(blogData);
  try {
    const response = await axiosService.post(
      `${baseUrl}api/blog/create`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
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

export const createBlog = createAsyncThunk(
  'ui/blog/common/createBlog',
  async (blogData: CreateBlogReq) => {
    const response = await apiCreateBlog(blogData);
    console.log(response);
    return response;
  },
);

export const resetCreateBlog = createAction('auth/resetSendEmailResetPassword');
export const createBlogExtraReducers = (
  builder: ActionReducerMapBuilder<BlogState>,
) => {
  builder
    .addCase(createBlog.pending, (state) => {
      state.blogCreateState.status = 'loading';
    })
    .addCase(createBlog.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.blogCreateState.status = 'failed';
        state.blogCreateState.error = action.payload.error?.message;
        state.blogCreateState.errors = action.payload.error?.errors;
      } else {
        state.blogCreateState.status = 'succeeded';
        console.log(state.blogCreateState.status);
      }
    })
    .addCase(resetCreateBlog, (state) => {
      state.blogCreateState.status = 'idle';
      state.blogCreateState.error = undefined;
      state.blogCreateState.data = undefined;
      state.blogCreateState.errors = undefined;
    });
};
