import { BlogCommentState } from './../BlogCommentSlice';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { deleteBlogComment } from '../BlogCommentActions';

const handleDeleteBlog = (
  builder: ActionReducerMapBuilder<BlogCommentState>,
) => {
  builder
    .addCase(deleteBlogComment.pending, (state) => {
      state.deleteComment.status = 'loading';
    })
    .addCase(deleteBlogComment.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.deleteComment.status = 'failed';
        state.deleteComment.error = action.payload.error.message;
      } else {
        state.deleteComment.status = 'succeeded';
        state.deleteComment.data = state.deleteComment.data;
      }
    })
    .addCase(deleteBlogComment.rejected, (state, action) => {
      state.deleteComment.status = 'failed';
      state.deleteComment.error = action.error.message;
    });
};

export default handleDeleteBlog;
