import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import ApiResponse from '../../../../../common/entities/ApiResponse';
import User from '../../../../../common/entities/User';
import Failure from '../../../../../common/entities/Failure';
import axiosService from '../../../../../common/services/axiosService';
import { HomeState, Statistics } from '../homeSlice';

export const apiFetchStatistics = async (): ApiResponse<Statistics> => {
  try {
    const response = await axiosService.get(
      'http://localhost:8080/HOME/api/statistics',
    );
    return {
      data: response.data,
    };
  } catch (error) {
    return {
      error: new Failure(error.response.data.message, error.response.status),
    };
  }
};
export const fetchStatistics = createAsyncThunk(
  'home/fetchStatistics',
  async () => {
    const response = await apiFetchStatistics();
    return response.data;
  },
);

export const fetchStatisticsExtraReducers = (
  builder: ActionReducerMapBuilder<HomeState>,
) => {
  builder
    .addCase(fetchStatistics.pending, (state) => {
      state.statistics.status = 'loading';
    })
    .addCase(fetchStatistics.fulfilled, (state, action) => {
      state.statistics.status = 'succeeded';
      state.statistics.data = action.payload;
      console.log(action.payload);
    });
};
