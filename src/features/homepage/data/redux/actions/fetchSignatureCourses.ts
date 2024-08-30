import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import ApiResponse from '../../../../../common/entities/ApiResponse';
import Course from '../../../../../common/entities/Course';
import Failure from '../../../../../common/entities/Failure';
import axiosService from '../../../../../common/services/axiosService';
import { HomeState } from '../homeSlice';

export const apiFetchSignatureCourses = async (): ApiResponse<Course[]> => {
  try {
    const response = await axiosService.get(
      'http://localhost:8080/HOME/api/list-popular-courses',
    );
    console.log(response);
  
    return {
      data: response.data,
    };
  } catch (error) {
    return {
      error: new Failure(error.response.data.message, error.response.status),
    };
  }
};

export const fetchSignatureCourses = createAsyncThunk(
  'home/fetchSignatureCourses',
  async () => {
    const response = await apiFetchSignatureCourses();
    
    return response.data;

  },
);

export const fetchSignatureCoursesExtraReducers = (
  builder: ActionReducerMapBuilder<HomeState>,
) => {
  builder
    .addCase(fetchSignatureCourses.pending, (state) => {
      state.signatureCourses.status = 'loading';
    })
    .addCase(fetchSignatureCourses.fulfilled, (state, action) => {
      state.signatureCourses.status = 'succeeded';
      state.signatureCourses.data = action.payload;
      console.log(action.payload);
    });
};
