import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import axiosService from '../../../../../../common/services/axiosService';
import { BlogState } from '../blogUISlice';

export type UserBlogReq = {
    userId: number;
    blogId: number;
}

export const apiFetchUserVoteBlog = async (blogData: UserBlogReq) => {
    const response = await axiosService.get(`/api/blog/userBlogVote?userId=${blogData.userId}&blogId=${blogData.blogId}`);
    return response.data;
};

export const userVoteBlog = createAsyncThunk('ui/blog/fetchUserVoteBlog', async (blogData: UserBlogReq) => {
    const response = await apiFetchUserVoteBlog(blogData);
    return response;
});

export const fetchUserVoteExtraReducers = (builder: ActionReducerMapBuilder<BlogState>) => {
    builder
        .addCase(userVoteBlog.fulfilled, (state, action) => {
            const blogId = action.meta.arg.blogId;
            const voteStatus = action.payload;             
            state.status = 'succeeded';
            state.userBlogVote[blogId] = voteStatus;
            console.log(voteStatus);
            
        });
};