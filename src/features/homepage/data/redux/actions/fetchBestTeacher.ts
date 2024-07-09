import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import axiosService from "../../../../../common/services/axiosService";

export const apiFetchBestTeacher = async () => {
    return await axiosService.get('/COMMON/api/best-teacher');
};
export const fetchBestTeacher = createAsyncThunk(
    'home/fetchBestTeacher',
    async () => {
        const response = await apiFetchBestTeacher();
        return response.data;
    }
);

export const fetchBestTeacherExtraReducers = (builder: ActionReducerMapBuilder<any>) => {
    builder
        .addCase(fetchBestTeacher.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchBestTeacher.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.bestTeacher = action.payload;
        })
        .addCase(fetchBestTeacher.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
};
