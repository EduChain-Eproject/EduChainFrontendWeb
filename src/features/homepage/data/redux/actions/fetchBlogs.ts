import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';

import axiosService from "../../../../../common/services/axiosService";
import { HomeState } from '../homeSlice';

export const apiFetchBlogs = async () => {
  return await axiosService.get('http://localhost:8080/HOME/api/newest-blog');
};
export const fetchBlogs = createAsyncThunk('home/fetchBlogs', async () => {
  const response = await apiFetchBlogs();
  return response.data;
});

export const fetchBlogsExtraReducers = (
  builder: ActionReducerMapBuilder<HomeState>,
) => {
  builder
    .addCase(fetchBlogs.pending, (state) => {
      state.blogs.status = 'loading';
    })
    .addCase(fetchBlogs.fulfilled, (state, action) => {
      state.blogs.status = 'succeeded';
      state.blogs.data = action.payload;
      console.log(action.payload);
    })
    .addCase(fetchBlogs.rejected, (state, action) => {
      state.blogs.status = 'failed';
      state.blogs.error = action.error.message;
    });
};
