import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import {
  fetchAddUserInterest,
  fetchDeleteUserInterest,
} from '../UserInterestAction';
import { UserInterestState } from '../UserInterestSlice';
import { fetchAddUserCourse } from '../../../../user_course/presentation/redux/UserCourseAction';

export const handleAddUserInterest = (
  builder: ActionReducerMapBuilder<UserInterestState>,
) => {
  builder
    .addCase(fetchAddUserInterest.pending, (state) => {
      state.userInterest!.status = 'loading';
    })
    .addCase(fetchAddUserInterest.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.userInterest!.status = 'failed';
        state.userInterest!.error = action.payload.error.message;
        state.userInterest!.errors = action.payload.error.errors;
        console.log(state.userInterest!.error);
        return;
      } else {
        state.userInterest!.data = action.payload.data;
      }
    })
    .addCase(fetchAddUserInterest.rejected, (state, action) => {
      state.userInterest!.status = 'failed';
      state.userInterest!.error = action.error.message;
    });
};
