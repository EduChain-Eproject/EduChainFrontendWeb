import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import ApiResponse from '../../../../../common/entities/ApiResponse';
import User from '../../../../../common/entities/User';
import Failure from '../../../../../common/entities/Failure';
import axiosService from '../../../../../common/services/axiosService';
import { HomeState } from '../homeSlice';

export const apiFetchMostPopularTeacher = async (): ApiResponse<User> => {
  try {
    //const response = await axiosService.get('/HOME/api/most-popular-teacher');
    const response = await axiosService.get(
      'http://localhost:8080/HOME/api/most-popular-teacher',
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

export const fetchMostPopularTeacher = createAsyncThunk(
  'home/fetchMostPopularTeacher',
  async () => {
    const response = await apiFetchMostPopularTeacher();
    return response.data;
  },
);

export const fetchMostPopularTeacherExtraReducers = (
  builder: ActionReducerMapBuilder<HomeState>,
) => {
  builder
    .addCase(fetchMostPopularTeacher.pending, (state) => {
      state.bestTeacher.status = 'loading';
    })
    .addCase(fetchMostPopularTeacher.fulfilled, (state, action) => {
      state.bestTeacher.status = 'succeeded';
      state.bestTeacher.data = action.payload;
    });
};
