import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import axiosService from '../../../../../../common/services/axiosService';
import { Blog } from '../../model/Blog';
import { BlogState } from '../blogUISlice';

export const apiFetchBlog: (blogId: number) => Promise<Blog> 
    = async (blogId: number) => {
        return (await axiosService.get(`/api/blog/${blogId}`)).data;
};

export const fetchBlog = createAsyncThunk('ui/blog/fetchBlog', async (blogId: number) => {
    const response = apiFetchBlog(blogId);
    return response;
});


export const fetchBlogExtraReducers = (builder: ActionReducerMapBuilder<BlogState>) => {
    builder
        .addCase(fetchBlog.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchBlog.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.blogDetail.data = action.payload;
        })
        .addCase(fetchBlog.rejected, (state, action) => {
            state.status = 'failed';
            state.blogs.error = action.error.message;
        });
};
