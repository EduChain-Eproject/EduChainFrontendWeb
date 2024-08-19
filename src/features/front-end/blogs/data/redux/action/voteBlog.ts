import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import axiosService from '../../../../../../common/services/axiosService';
import { BlogState } from '../blogUISlice';

export type VoteReq = {
    userId: number;
    blogId: number;
    vote: number
}


export const apiVoteBlog = async (blogData: VoteReq) => {
  const response = await axiosService.post(
    `http://localhost:8080/api/blog/vote`,
    blogData,
  );
  return response.data;
};

export const voteBlog = createAsyncThunk(
  'ui/blog/voteBlog',
  async (blogData: VoteReq) => {
    const response = await apiVoteBlog(blogData);
    return response;
  },
);

export const voteExtraReducers = (
  builder: ActionReducerMapBuilder<BlogState>,
) => {
  builder
    .addCase(voteBlog.pending, (state) => {
      state.voteBlogState.status = 'loading';
    })
    .addCase(voteBlog.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.voteBlogState.status = 'failed';
        state.voteBlogState.error = action.payload.error?.message;
        state.voteBlogState.errors = action.payload.error?.errors;
      } else {
        state.voteBlogState.status = 'succeeded';
        console.log(state.voteBlogState.status);
      }
    });
};

