import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { UserCourseState } from '../UserCourseSlice';
import { fetchUserCourse } from '../UserCourseAction';

export const handleGetUserCourse = (
  builder: ActionReducerMapBuilder<UserCourseState>,
) => {
  builder
    .addCase(fetchUserCourse.pending, (state) => {
      state.listUserCourse.status = 'loading';
    })
    .addCase(fetchUserCourse.fulfilled, (state, action) => {
      if (action.payload.error) {
        console.log(action.payload.error);
        state.listUserCourse.status = 'failed';
        state.listUserCourse.error = action.payload.error;
      } else {
        console.log('success');
        state.listUserCourse.status = 'succeeded';
        state.listUserCourse.data = action.payload.data;
        state.pagination.totalPages = action.payload.totalPages;
        state.pagination.totalElements = action.payload.totalElements;
        console.log('data');
        console.log(state.pagination.totalElements);
        console.log(state.pagination.totalPages);
        console.log(state.listUserCourse.data);
      }
    })
    .addCase(fetchUserCourse.rejected, (state, action) => {
      state.listUserCourse.status = 'failed';
      state.listUserCourse.error = action.error.message;
    });
};
