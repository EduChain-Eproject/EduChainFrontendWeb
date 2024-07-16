import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import axiosService from '../../../../../../common/services/axiosService';
import Failure from '../../../../../../common/entities/Failure';
import Category from '../../../../../../common/entities/Category';
import ApiResponse from '../../../../../../common/entities/ApiResponse';
import { CourseState } from '../redux/courseSlice';

const apiFetchListCategories: () => ApiResponse<Category[]> = async () => {
  try {
    const response = await axiosService.get('/COMMON/api/category/list');

    return response.data;
  } catch (error) {
    return new Failure(error.response.data.message, error.response.status);
  }
};

export const fetchListCategories = createAsyncThunk(
  'courses/fetchListCategories',
  async () => {
    return await apiFetchListCategories();
  },
);

export const handleGetListCategories = (
  builder: ActionReducerMapBuilder<CourseState>,
) => {
  builder
    .addCase(fetchListCategories.pending, (state) => {
      state.listCoursesPage.status = 'loading';
    })
    .addCase(fetchListCategories.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.listCoursesPage.status = 'failed';
        state.listCoursesPage.error = action.payload.error.message;
      } else {
        state.listCoursesPage.status = 'get list succeeded';
        if (state.listCoursesPage.data) {
          state.listCoursesPage.data.categories = action.payload.data;
        }
      }
    })
    .addCase(fetchListCategories.rejected, (state, action) => {
      state.listCoursesPage.status = 'failed';
      state.listCoursesPage.error = action.error.message;
    });
};

export default handleGetListCategories;
