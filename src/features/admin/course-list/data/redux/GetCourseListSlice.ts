import { createSlice } from '@reduxjs/toolkit';
import Course from '../../../../../common/entities/Course';
import { CommonState, initCommonState } from '../../../../../common/state';
import HandleGetCourseList from '../service/HandleCourseList';

export interface GetCourseListState {
  GetcourseListState: CommonState<Course[]>;
  pagination: {
    totalPages: number;
    totalElements: number;
    currentPage: number;
  };
  blockResultState: CommonState<boolean>;
}

const initialState: GetCourseListState = {
  GetcourseListState: initCommonState,
  pagination: {
    totalPages: 0,
    totalElements: 0,
    currentPage: 0,
  },
  blockResultState: initCommonState,
};

const GetCourseListSlice = createSlice({
  name: 'chapters',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    HandleGetCourseList(builder);
  },
});

export default GetCourseListSlice.reducer;
