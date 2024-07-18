import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import axiosService from "../../../../../common/services/axiosService";

export const apiFetchPopularCourse = async () => {
    return await axiosService.get('/COMMON/api/popular-course');
};

export const fetchPopularCourse = createAsyncThunk(
    'home/fetchPopularCourse',
    async () => {
        const response = await apiFetchPopularCourse();
        return response.data;
    }
);

export const fetchPopularCourseExtraReducers = (builder: ActionReducerMapBuilder<any>) => {
    builder
        .addCase(fetchPopularCourse.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchPopularCourse.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.popularCourse = action.payload;
        })
        .addCase(fetchPopularCourse.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
};
