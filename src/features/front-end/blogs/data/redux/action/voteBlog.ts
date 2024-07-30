import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import axiosService from '../../../../../../common/services/axiosService';
import { BlogState } from '../blogUISlice';

export type VoteReq = {
    userId: number;
    blogId: number;
    vote: number
}


export const apiVoteBlog= async (blogData: VoteReq) => {
    const response = await axiosService.post(`/api/blog/vote`, blogData);
    return response.data;
};


export const voteBlog = createAsyncThunk('ui/blog/voteBlog', async (blogData: VoteReq) => {
    const response = await apiVoteBlog(blogData);
    return response;
});


export const voteExtraReducers = (builder: ActionReducerMapBuilder<BlogState>) => {
    builder

        .addCase(voteBlog.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.blogDetail = action.payload;
        })
};

