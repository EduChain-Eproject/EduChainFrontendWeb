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
        state.userInterests.error = action.payload.error;
      } else {
        console.log('success');
        state.userInterests.status = 'succeeded';
        state.userInterests.data = action.payload.data;
        state.pagination.totalPages = action.payload.totalPages;
        state.pagination.totalElements = action.payload.totalElements;
        console.log(state.pagination.totalElements);
        console.log(state.pagination.totalPages);
        console.log(state.userInterests.data);
      }
    })
    .addCase(fetchUserInterests.rejected, (state, action) => {
      state.userInterests.status = 'failed';
      state.userInterests.error = action.error.message;
    });
};
