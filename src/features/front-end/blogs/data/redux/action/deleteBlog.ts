import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import axiosService from '../../../../../../common/services/axiosService';
import { BlogState } from '../blogUISlice';

export const apiDeleteBlog = async (blogId: number) => {
  const response = await axiosService.delete(
    `http://localhost:8080/api/blog/${blogId}`,
  );
  return response.data;
};

export const deleteBlog = createAsyncThunk(
  'ui/blog/deleteBlog',
  async (blogId: number) => {
    const response = await apiDeleteBlog(blogId);
    return response;
  },
);

export const deleteBlogExtraReducers = (
  builder: ActionReducerMapBuilder<BlogState>,
) => {
  builder
    .addCase(deleteBlog.pending, (state) => {
      state.deleteBlog.status = 'loading';
    })
    .addCase(deleteBlog.fulfilled, (state, action) => {
      console.log('delete ');
      state.deleteBlog.status = 'succeeded';
    })
    .addCase(deleteBlog.rejected, (state, action) => {
      state.deleteBlog.status = 'failed';
      state.deleteBlog.error = action.error.message;
    });
};
