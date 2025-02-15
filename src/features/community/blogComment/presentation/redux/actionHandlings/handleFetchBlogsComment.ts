import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { BlogCommentState } from '../BlogCommentSlice';

import { fetchBlogsComment } from '../BlogCommentActions';

const handleFetchBlogsComment = (
  builder: ActionReducerMapBuilder<BlogCommentState>,
) => {
  builder
    .addCase(fetchBlogsComment.pending, (state) => {
      state.fetchComments.status = 'loading';
    })
    .addCase(fetchBlogsComment.fulfilled, (state, action) => {
      if (action.payload.error) {
        console.log('aaa');
        state.fetchComments.status = 'fail';
        state.fetchComments.error = action.payload.error.message;
      } else {
        state.fetchComments.status = 'succeeded';
        state.fetchComments.data = action.payload.data;
        console.log(state.fetchComments.data);
      }
    })
    .addCase(fetchBlogsComment.rejected, (state, action) => {
      state.fetchComments.status = 'fail';
      state.fetchComments.error = action.error.message;
    });
};

export default handleFetchBlogsComment;
