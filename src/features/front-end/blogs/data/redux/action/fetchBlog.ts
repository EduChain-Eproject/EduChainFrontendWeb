import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import axiosService from '../../../../../../common/services/axiosService';
import { Blog } from '../../model/Blog';
import { BlogState } from '../blogUISlice';

const baseUrl = 'http://localhost:8080/';
export const apiFetchBlog: (blogId: number) => Promise<Blog> = async (
  blogId: number,
) => {
  return (await axiosService.get(`${baseUrl}api/blog/${blogId}`)).data;
};

export const fetchBlog = createAsyncThunk(
  'ui/blog/fetchBlog',
  async (blogId: number) => {
    const response = apiFetchBlog(blogId);
    console.log(response);
    return response;
  },
);

export const fetchBlogExtraReducers = (
  builder: ActionReducerMapBuilder<BlogState>,
) => {
  builder
    .addCase(fetchBlog.pending, (state) => {
      state.blogDetail.status = 'loading';
    })
    .addCase(fetchBlog.fulfilled, (state, action) => {
      state.blogDetail.status = 'succeeded';
      state.blogDetail.data = action.payload;
      console.log(state.blogDetail.data);
    })
    .addCase(fetchBlog.rejected, (state, action) => {
      state.blogDetail.status = 'failed';
      state.blogs.error = action.error.message;
    });
};
