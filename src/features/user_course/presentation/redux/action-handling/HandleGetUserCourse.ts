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
        console.log('fail');
        state.listUserCourse.status = 'failed';
        state.listUserCourse.error = action.payload.error.message;
      } else {
        console.log('success');
        state.listUserCourse.status = 'succeeded';
        state.listUserCourse.data = action.payload.data;
        state.pagination.totalPages = action.payload.totalPages;
        state.pagination.totalElements = action.payload.totalElements;
      }
    })
    .addCase(fetchUserCourse.rejected, (state, action) => {
      console.log('fatal fail');
      state.listUserCourse.status = 'failed';
      state.listUserCourse.error = action.error.message;
    });
};
