import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import axiosService from "../../../../../common/services/axiosService";


export const apiFetchSignatureCourses = async () => {
    return await axiosService.get('/COMMON/api/signature-courses');
};
export const fetchSignatureCourses = createAsyncThunk(
    'home/fetchSignatureCourses',
    async () => {
        const response = await apiFetchSignatureCourses();
        return response.data;
    }
);

export const fetchSignatureCoursesExtraReducers = (builder: ActionReducerMapBuilder<any>) => {
    builder
        .addCase(fetchSignatureCourses.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchSignatureCourses.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.signatureCourses = action.payload;
        })
        .addCase(fetchSignatureCourses.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
};
