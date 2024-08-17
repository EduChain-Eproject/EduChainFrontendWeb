import {
  createBlogComment,
  resetcreateBlogComment,
} from '../BlogCommentActions';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';

import { BlogCommentState } from '../BlogCommentSlice';

const handleCreateComment = (
  builder: ActionReducerMapBuilder<BlogCommentState>,
) => {
  builder
    .addCase(createBlogComment.pending, (state) => {
      state.createComment.status = 'loading';
    })
    .addCase(createBlogComment.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.createComment.status = 'failed';
        state.createComment.error = action.payload.error.message;
      } else {
        state.createComment.status = 'succeeded';
        state.createComment.data = action.payload.data;
      }
    })
    .addCase(createBlogComment.rejected, (state, action) => {
      state.createComment.status = 'failed';
      state.createComment.error = action.error.message;
    })
    .addCase(resetcreateBlogComment, (state) => {
      state.createComment = {
        status: 'idle',
        data: undefined,
        error: undefined,
        errors: undefined,
      };
    });
};

export default handleCreateComment;
