import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import axiosService from '../../../../../../common/services/axiosService';
import { BlogState } from '../blogUISlice';

export const apiDeleteBlog = async (blogId: number) => {
    const response = await axiosService.delete(`/api/blog/${blogId}`);
    return response.data;
};

export const deleteBlog = createAsyncThunk('ui/blog/deleteBlog', async (blogId: number) => {
    const response = await apiDeleteBlog(blogId);
    return response;
});

export const deleteBlogExtraReducers = (builder: ActionReducerMapBuilder<BlogState>) => {
    builder
        .addCase(deleteBlog.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(deleteBlog.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.blogDetail.data = action.payload;
        })
        .addCase(deleteBlog.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
};
