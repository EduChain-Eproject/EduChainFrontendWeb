import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import axiosService from '../../../../../../common/services/axiosService';
import { BlogState } from '../blogUISlice';
import { Blog } from '../../model/Blog';
import Failure from '../../../../../../common/entities/Failure';
import ApiResponse from '../../../../../../common/entities/ApiResponse';

export type UpdateBlogReq = {
  id: number;
  title: string;
  blogCategoryId: number;
  blogText: string;
  photo: File | null;
};

const toFormData = (blogData: UpdateBlogReq): FormData => {
  const formData = new FormData();
  formData.append('title', blogData.title);
  formData.append('blogCategoryId', blogData.blogCategoryId.toString());
  formData.append('blogText', blogData.blogText);
  if (blogData.photo) {
    formData.append('photo', blogData.photo);
  }
  return formData;
};

export const apiUpdateBlog = async (
  blogData: UpdateBlogReq,
): ApiResponse<Blog> => {
  const formData = toFormData(blogData);
  try {
    const response = await axiosService.put(
      `http://localhost:8080/api/blog/${blogData.id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
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

export const updateBlog = createAsyncThunk(
  'ui/blog/updateBlog',
  async (blogData: UpdateBlogReq) => {
    const response = await apiUpdateBlog(blogData);
    return response;
  },
);

export const updateBlogExtraReducers = (
  builder: ActionReducerMapBuilder<BlogState>,
) => {
  builder
    .addCase(updateBlog.pending, (state) => {
      state.blogUpdate.status = 'loading';
    })
    .addCase(updateBlog.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.blogUpdate.status = 'failed';
        state.blogUpdate.error = action.payload.error?.message;
        state.blogUpdate.errors = action.payload.error?.errors;
      } else {
        state.blogUpdate.status = 'succeeded';
        if (state.blogUpdate.data !== null) {
          state.blogUpdate.data = action.payload.data;
        }
      }
    })
    .addCase(updateBlog.rejected, (state, action) => {
      state.blogUpdate.status = 'failed';
      state.blogUpdate.error = action.error.message;
    });
};