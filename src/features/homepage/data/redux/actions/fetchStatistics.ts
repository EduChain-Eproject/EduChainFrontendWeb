import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import axiosService from "../../../../../common/services/axiosService";

export const apiFetchStatistics = async () => {
    return await axiosService.get('/COMMON/api/statistics');
};
export const fetchStatistics = createAsyncThunk(
    'home/fetchStatistics',
    async () => {
        const response = await apiFetchStatistics();
        return response.data;
    }
);

export const fetchStatisticsExtraReducers = (builder: ActionReducerMapBuilder<any>) => {
    builder
        .addCase(fetchStatistics.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchStatistics.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.statistics = action.payload;
        })
        .addCase(fetchStatistics.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
};
