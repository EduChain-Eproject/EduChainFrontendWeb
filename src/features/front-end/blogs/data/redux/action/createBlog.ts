import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import axiosService from '../../../../../../common/services/axiosService';

export type CreateBlogReq = {
    title: string;
    userId: number;
    blogCategoryId: number;
    blogText: string;
    photo: File | null;
}

const toFormData = (blogData: CreateBlogReq): FormData => {
    const formData = new FormData();
    formData.append('title', blogData.title);
    formData.append('userId', blogData.userId.toString());
    formData.append('blogCategoryId', blogData.blogCategoryId.toString());
    formData.append('blogText', blogData.blogText);
    if (blogData.photo) {
        formData.append('photo', blogData.photo);
    }
    return formData;
};

export const apiCreateBlog = async (blogData: CreateBlogReq) => {
    const formData = toFormData(blogData);
    const response = await axiosService.post('/api/blog', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

export const createBlog = createAsyncThunk('ui/blog/createBlog', async (blogData: CreateBlogReq) => {
    const response = await apiCreateBlog(blogData);
    return response;
});

export const createBlogExtraReducers = (builder: ActionReducerMapBuilder<any>) => {
    builder
        .addCase(createBlog.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(createBlog.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
        })
        .addCase(createBlog.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
};
