import { createSlice } from '@reduxjs/toolkit';
import { CommonState } from '../../../../common/state';
import { handleGetUserCourse } from './action-handling/HandleGetUserCourse';
import { UserCourse } from '../../domain/entities/UserCourse';
import { handleAddUserCourse } from './action-handling/HandleAddUserCourse';

export interface UserCourseState {
  listUserCourse: CommonState<UserCourse[]>;
  pagination: {
    totalPages: number;
    totalElements: number;
    currentPage: number;
  };
  userCourse: CommonState<UserCourse>;
}
const initialState: UserCourseState = {
  listUserCourse: { data: undefined, status: null, error: undefined },
  pagination: {
    totalPages: 0,
    totalElements: 0,
    currentPage: 0,
  },
  userCourse: { data: undefined, status: null, error: undefined },
};

const useCourseSlice = createSlice({
  name: 'user_course',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    handleGetUserCourse(builder);
    handleAddUserCourse(builder);
  },
});

export const { setPage } = useCourseSlice.actions;

export default useCourseSlice.reducer;
