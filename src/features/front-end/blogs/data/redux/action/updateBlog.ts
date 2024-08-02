import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import axiosService from '../../../../../../common/services/axiosService';

export type UpdateBlogReq = {
    id: number;
    title: string;
    blogCategoryId: number;
    blogText: string;
    photo: File | null;
}

const toFormData = (blogData: UpdateBlogReq): FormData => {
    const formData = new FormData();
    formData.append('title', blogData.title);
    formData.append('blogCategoryId', blogData.blogCategoryId.toString());
    formData.append('blogText', blogData.blogText);
    if (blogData.photo) {
        formData.append('photo', blogData.photo);
    }
    return formData;
};

export const apiUpdateBlog = async (blogData: UpdateBlogReq) => {
    const formData = toFormData(blogData);
    const response = await axiosService.put(`/api/blog/${blogData.id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

export const updateBlog = createAsyncThunk('ui/blog/updateBlog', async (blogData: UpdateBlogReq) => {
    const response = await apiUpdateBlog(blogData);
    return response;
});

export const updateBlogExtraReducers = (builder: ActionReducerMapBuilder<any>) => {
    builder
        .addCase(updateBlog.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(updateBlog.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
        })
        .addCase(updateBlog.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
};