import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { UserHomeworkState } from '../UserHomeworkForProfileSlice';
import { fetchUserHomework } from '../UserHomeworkAction';

export const handleGetUserHomework = (
  builder: ActionReducerMapBuilder<UserHomeworkState>,
) => {
  builder
    .addCase(fetchUserHomework.pending, (state) => {
      state.userHomeworks.status = 'loading';
    })
    .addCase(fetchUserHomework.fulfilled, (state, action) => {
      if (action.payload.error) {
        console.log('fail');
        state.userHomeworks.status = 'failed';
        state.userHomeworks.error = action.payload.error.message;
      } else {
        console.log('success');
        state.userHomeworks.status = 'succeeded';
        state.userHomeworks.data = action.payload.data;
        state.pagination.totalPages = action.payload.totalPages;
        state.pagination.totalElements = action.payload.totalElements;
      }
    })
    .addCase(fetchUserHomework.rejected, (state, action) => {
      console.log('fatal fail');
      state.userHomeworks.status = 'failed';
      state.userHomeworks.error = action.error.message;
    });
};
