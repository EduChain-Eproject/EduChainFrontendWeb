import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { fetchDeleteUserInterest } from '../UserInterestAction';
import { UserInterestState } from '../UserInterestSlice';

export const handleDeleteInterests = (
  builder: ActionReducerMapBuilder<UserInterestState>,
) => {
  builder
    .addCase(fetchDeleteUserInterest.pending, (state) => {
      state.deleteStatus.status = 'loading';
    })
    .addCase(fetchDeleteUserInterest.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.deleteStatus.status = 'failed';
        state.deleteStatus.error = action.payload.error.message;
      } else {
        state.deleteStatus.status = 'succeeded';
      }
    })
    .addCase(fetchDeleteUserInterest.rejected, (state, action) => {
      state.deleteStatus.status = 'failed';
      state.deleteStatus.error = action.error.message;
    });
};
