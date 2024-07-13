import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import axiosService from '../../../../../../common/services/axiosService';
import { BlogState } from '../blogUISlice';
import { Blog } from '../../model/Blog';

export const apiFetchBlogs: () => Promise<Blog[]>
    = async () => {
        return (await axiosService.get('/api/blog')).data;
    };

export const fetchBlogs = createAsyncThunk(
    '/ui/blog/fetchBlogs',
    async () => {
        const response = await apiFetchBlogs();

        return response;
    }
);

export const fetchBlogsExtraReducers = (builder: ActionReducerMapBuilder<BlogState>) => {
    builder
        .addCase(fetchBlogs.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchBlogs.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.blogs.data = action.payload;
        })
        .addCase(fetchBlogs.rejected, (state, action) => {
            state.status = 'failed';
            state.blogs.error = action.error.message;
        });
};
