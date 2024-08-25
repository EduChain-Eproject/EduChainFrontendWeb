import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import ApiResponse from '../../../../../common/entities/ApiResponse';
import Category from '../../../../../common/entities/Category';
import Failure from '../../../../../common/entities/Failure';
import axiosService from '../../../../../common/services/axiosService';
import { HomeState } from '../homeSlice';

export const apiFetchBestCategories = async (): ApiResponse<Category[]> => {
  try {
    const response = await axiosService.get(
      'http://localhost:8080/HOME/api/best-categories',
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

export const fetchBestCategories = createAsyncThunk(
  'home/fetchBestCategories',
  async () => {
    const response = await apiFetchBestCategories();
    return response.data;
  },
);

export const fetchBestCategoriesExtraReducers = (
  builder: ActionReducerMapBuilder<HomeState>,
) => {
  builder
    .addCase(fetchBestCategories.pending, (state) => {
      state.bestCategories.status = 'loading';
    })
    .addCase(fetchBestCategories.fulfilled, (state, action) => {
      state.bestCategories.status = 'succeeded';
      state.bestCategories.data = action.payload;
    });
};
