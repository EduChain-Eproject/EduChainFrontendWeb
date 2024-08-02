import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { fetchUserInterests } from '../UserInterestAction';
import { UserInterestState } from '../UserInterestSlice';

export const handleGetUserInterests = (
  builder: ActionReducerMapBuilder<UserInterestState>,
) => {
  builder
    .addCase(fetchUserInterests.pending, (state) => {
      state.userInterests.status = 'loading';
    })
    .addCase(fetchUserInterests.fulfilled, (state, action) => {
      if (action.payload.error) {
        console.log(action.payload.error);
        state.userInterests.status = 'failed';
        state.userInterests.error = action.payload.error.message;
      } else {
        console.log('success');
        state.userInterests.status = 'succeeded';
        state.userInterests.data = action.payload.data;
        state.pagination.totalPages = action.payload.totalPages;
        state.pagination.totalElements = action.payload.totalElements;
      }
    })
    .addCase(fetchUserInterests.rejected, (state, action) => {
      state.userInterests.status = 'failed';
      state.userInterests.error = action.error.message;
    });
};
