import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import axiosService from '../../../../../../common/services/axiosService';
import { BlogCategory } from '../../model/BlogCategory'
import { BlogState } from '../blogUISlice';
const baseUrl = 'http://localhost:8080/';
export const fetchBlogCategories = createAsyncThunk(
  'ui/blog/fetchBlogCategories',
  async () => {
    const response = await axiosService.get<BlogCategory[]>(
      `${baseUrl}api/blog_category`,
    );
    return response.data;
  },
);

export const fetchBlogCategoriesExtraReducers = (
  builder: ActionReducerMapBuilder<BlogState>,
) => {
  builder
    .addCase(fetchBlogCategories.pending, (state) => {
      state.blogCategories.status = 'loading';
    })
    .addCase(fetchBlogCategories.fulfilled, (state, action) => {
      state.blogCategories.status = 'succeeded';
      if (action.payload) {
        state.blogCategories.data = action.payload;
        console.log(state.blogCategories.data);
      }
    })
    .addCase(fetchBlogCategories.rejected, (state, action) => {
      state.blogCategories.status = 'failed';
      state.blogCategories.error = action.error.message;
    });
};
