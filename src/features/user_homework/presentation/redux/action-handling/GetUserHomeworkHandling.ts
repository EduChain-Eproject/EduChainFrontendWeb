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
        console.log('vvvv');
        state.userHomeworks.status = 'failed';
        state.userHomeworks.error = action.payload.error;
      } else {
        console.log('success');
        console.log('vvvv');
        state.userHomeworks.status = 'succeeded';
        state.userHomeworks.data = action.payload.data;
        state.pagination.totalPages = action.payload.totalPages;
        state.pagination.totalElements = action.payload.totalElements;
        console.log(state.pagination.totalElements);
        console.log(state.pagination.totalPages);
        console.log(state.userHomeworks.data);
      }
    })
    .addCase(fetchUserHomework.rejected, (state, action) => {
      console.log('vvvve');
      state.userHomeworks.status = 'failed';
      state.userHomeworks.error = action.error.message;
    });
};
