import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { UserCourseState } from '../UserCourseSlice';
import { fetchAddUserCourse, fetchUserCourse } from '../UserCourseAction';

export const handleAddUserCourse = (
  builder: ActionReducerMapBuilder<UserCourseState>,
) => {
  builder
    .addCase(fetchAddUserCourse.pending, (state) => {
      state.userCourse.status = 'loading';
    })
    .addCase(fetchAddUserCourse.fulfilled, (state, action) => {
      if (action.payload.error) {
        console.log(action.payload.error);
        state.userCourse.status = 'failed';
        state.userCourse.error = action.payload.error;
      } else {
        console.log('success');
        state.userCourse.status = 'succeeded';
        state.userCourse.data = action.payload.data;
        console.log('data');
        console.log(state.userCourse.data);
      }
    })
    .addCase(fetchAddUserCourse.rejected, (state, action) => {
      state.userCourse.status = 'failed';
      state.userCourse.error = action.error.message;
    });
};
