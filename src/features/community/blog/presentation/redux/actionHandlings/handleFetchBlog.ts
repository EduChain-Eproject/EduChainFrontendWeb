import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { BlogState } from '../blogSlice';
import { fetchBlog } from '../blogActions';

const handleFetchBlog = (builder: ActionReducerMapBuilder<BlogState>) => {
    builder
      .addCase(fetchBlog.pending, (state) => {
        state.blog.status = 'loading';
      })
      .addCase(fetchBlog.fulfilled, (state, action) => {
        if (action.payload.error) {
          state.blog.status = 'fail';
          state.blog.error = action.payload.error.message;
          state.blog.errors = action.payload.error.errors;
        } else {
          state.blog.status = 'succeeded';
          state.blog.data = action.payload.data;
        }
      })
      .addCase(fetchBlog.rejected, (state, action) => {
        state.blog.status = 'fail';
        state.error = action.error.message;
      });
};

export default handleFetchBlog;
