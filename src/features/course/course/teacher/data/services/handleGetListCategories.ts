import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import ApiResponse from '../../../../../../common/entities/ApiResponse';
import Category from '../../../../../../common/entities/Category';
import Failure from '../../../../../../common/entities/Failure';
import axiosService from '../../../../../../common/services/axiosService';
import { CourseState } from '../redux/courseSlice';

export const apiFetchListCategories: () => ApiResponse<
  Category[]
> = async () => {
  try {
    const response = await axiosService.get('/COMMON/api/category/list');

    return { data: response.data };
  } catch (error) {
    return {
      error: new Failure(error.response.data.message, error.response.status),
    };
  }
};

export const fetchListCategories = createAsyncThunk(
  'courses/fetchListCategories',
  async () => {
    return await apiFetchListCategories();
  },
);

const handleGetListCategories = (
  builder: ActionReducerMapBuilder<CourseState>,
) => {
  builder
    .addCase(fetchListCategories.pending, (state) => {
      state.createCoursePage.status = 'loading';
    })
    .addCase(fetchListCategories.fulfilled, (state, action) => {
      console.log(action.payload.data);

      if (action.payload.error) {
        state.createCoursePage.status = 'failed';
        state.createCoursePage.error = action.payload.error.message;
      } else {
        state.createCoursePage.status = 'get list succeeded';
        state.createCoursePage.data = action.payload.data;
      }
    })
    .addCase(fetchListCategories.rejected, (state, action) => {
      state.createCoursePage.status = 'failed';
      state.createCoursePage.error = action.error.message;
    });
};

export default handleGetListCategories;
