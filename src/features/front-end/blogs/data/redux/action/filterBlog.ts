import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import axiosService from '../../../../../../common/services/axiosService';
import { Blog } from '../../model/Blog';
import { BlogState } from '../blogUISlice';

export type FilterBlogReq = {
    sortStrategy: string;
    keyword: string;
    categoryIdArray: number[];
}

export const apiFilterBlog: (data: FilterBlogReq) => Promise<Blog[]> 
    = async (data: FilterBlogReq) => {
        const queryParams = new URLSearchParams(data as any).toString();
        
        return (await axiosService.get(`/api/blog/filter?${queryParams}`)).data;
};



export const filterBlog = createAsyncThunk('ui/blog/filterBlog', async (data: FilterBlogReq) => {
    const response = await apiFilterBlog(data);
    console.log(response);
    
    return response;
});


export const filterBlogExtraReducers = (builder: ActionReducerMapBuilder<BlogState>) => {
    builder
        .addCase(filterBlog.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(filterBlog.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.blogs.data = action.payload;
        })
        .addCase(filterBlog.rejected, (state, action) => {
            state.status = 'failed';
            state.blogs.error = action.error.message;
        });
};
