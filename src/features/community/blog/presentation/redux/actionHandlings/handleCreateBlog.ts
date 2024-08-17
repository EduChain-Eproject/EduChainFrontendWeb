import { ActionReducerMapBuilder } from '@reduxjs/toolkit';

import { createBlog, resetcreateBlog } from '../blogActions';
import { BlogState } from '../blogSlice';

const handleCreateBlog = (builder: ActionReducerMapBuilder<BlogState>) => {
  builder
    .addCase(createBlog.pending, (state) => {
      state.createBlog.status = 'loading';
    })
    .addCase(createBlog.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.createBlog.status = 'failed';
        state.createBlog.errors = action.payload.error.errors;
      } else {
        state.createBlog.status = 'succeeded';
        state.createBlog.data = action.payload.data;
      }
    })
    .addCase(createBlog.rejected, (state, action) => {
      state.createBlog.status = 'failed';
      state.createBlog.error = action.error.message;
    })
    .addCase(resetcreateBlog, (state) => {
      state.createBlog = {
        status: 'idle',
        data: undefined,
        error: undefined,
        errors: undefined,
      };
    });
};

export default handleCreateBlog;
