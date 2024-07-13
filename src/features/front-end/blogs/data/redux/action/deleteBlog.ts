import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import axiosService from '../../../../../../common/services/axiosService';

export const apiDeleteBlog = async (blogId: number) => {
    await axiosService.delete(`/api/blog/${blogId}`);
};

export const deleteBlog = createAsyncThunk('ui/blog/deleteBlog', async (blogId: number) => {
    const response = apiDeleteBlog(blogId);
    return response;
});

export const deleteBlogExtraReducers = (builder: ActionReducerMapBuilder<any>) => {
    builder
        .addCase(deleteBlog.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(deleteBlog.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
        })
        .addCase(deleteBlog.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
};
