import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import UserProfileSlice, { UserProfileState } from '../UserProfileSlice';
import { getUserProfileAction } from '../UserProfileAction';

const GetUserProfileHandling = (
  builder: ActionReducerMapBuilder<UserProfileState>,
) => {
  builder
    .addCase(getUserProfileAction.pending, (state) => {
      state.profilePage.status = 'loading';
    })
    .addCase(getUserProfileAction.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.profilePage.status = 'failed';
        state.profilePage.error = action.payload.error.message;
      } else {
        state.profilePage.status = 'succeeded';
        state.profilePage.data = action.payload.data;
      }
    })
    .addCase(getUserProfileAction.rejected, (state, action) => {
      state.profilePage.status = 'failed';
      state.profilePage.error = action.error.message;
    });
};

export default GetUserProfileHandling;
