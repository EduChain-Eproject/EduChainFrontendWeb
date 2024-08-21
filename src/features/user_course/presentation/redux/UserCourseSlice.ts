import { createSlice } from '@reduxjs/toolkit';
import { CommonState, initCommonState } from '../../../../common/state';
import { handleGetUserCourse } from './action-handling/HandleGetUserCourse';
import { handleAddUserCourse } from './action-handling/HandleAddUserCourse';
import UserCourse from '../../../../common/entities/UserCourse';

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
  listUserCourse: initCommonState,
  pagination: {
    totalPages: 0,
    totalElements: 0,
    currentPage: 0,
  },
  userCourse: initCommonState,
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
