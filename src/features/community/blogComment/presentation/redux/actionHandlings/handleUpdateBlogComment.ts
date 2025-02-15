import { updateBlogComment } from './../BlogCommentActions';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { BlogCommentState } from '../BlogCommentSlice';

const handleUpdateBlog = (
  builder: ActionReducerMapBuilder<BlogCommentState>,
) => {
  builder
    .addCase(updateBlogComment.pending, (state) => {
      state.updateComment.status = 'loading';
    })
    .addCase(updateBlogComment.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.updateComment.status = 'fail';
        state.updateComment.data = action.payload.data;
        state.updateComment.error = action.payload.error.message;
        state.updateComment.errors = action.payload.error.errors;
      } else {
        state.updateComment.status = 'succeeded';
        state.updateComment.data = action.payload.data;
      }
    })
    .addCase(updateBlogComment.rejected, (state, action) => {
      state.updateComment.status = 'failed';
      state.updateComment.error = action.error.message;
    });
};

export default handleUpdateBlog;
