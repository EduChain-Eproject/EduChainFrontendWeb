import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';

import axiosService from "../../../../../common/services/axiosService";

export const apiFetchBlogs = async () => {
    return await axiosService.get('/COMMON/api/blogs');
};
export const fetchBlogs = createAsyncThunk(
    'home/fetchBlogs',
    async () => {
        const response = await apiFetchBlogs();
        return response.data;
    }
);

export const fetchBlogsExtraReducers = (builder: ActionReducerMapBuilder<any>) => {
    builder
        .addCase(fetchBlogs.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchBlogs.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.blogs = action.payload;
        })
        .addCase(fetchBlogs.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
};
