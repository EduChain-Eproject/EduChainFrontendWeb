import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { fetchDeleteUserInterest } from '../UserInterestAction';
import { UserInterestState } from '../UserInterestSlice';

export const handleDeleteInterests = (
  builder: ActionReducerMapBuilder<UserInterestState>,
) => {
  builder
    .addCase(fetchDeleteUserInterest.pending, (state) => {
      state.deleteStatus = { ...state.deleteStatus, status: 'loading' };
    })
    .addCase(fetchDeleteUserInterest.fulfilled, (state) => {
      state.deleteStatus = { ...state.deleteStatus, status: 'succeeded' };
    })
    .addCase(fetchDeleteUserInterest.rejected, (state, action) => {
      state.deleteStatus = {
        ...state.deleteStatus,
        status: 'failed',
        error: action.error.message,
      };
    });
};
