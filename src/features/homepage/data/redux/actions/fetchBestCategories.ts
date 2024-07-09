import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import axiosService from "../../../../../common/services/axiosService";

export const apiFetchBestCategories = async () => {
    return await axiosService.get('/COMMON/api/best-categories');
};
export const fetchBestCategories = createAsyncThunk(
    'home/fetchBestCategories',
    async () => {
        const response = await apiFetchBestCategories();
        return response.data;
    }
);

export const fetchBestCategoriesExtraReducers = (builder: ActionReducerMapBuilder<any>) => {
    builder
        .addCase(fetchBestCategories.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchBestCategories.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.bestCategories = action.payload;
        })
        .addCase(fetchBestCategories.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
};
