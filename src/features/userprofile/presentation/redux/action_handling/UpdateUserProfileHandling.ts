import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import {
  resetUpdateProfileStatus,
  updateUserProfileAction,
} from '../UserProfileAction';
import { UserProfileState } from '../UserProfileSlice';

const updateUserProfileHandling = (
  builder: ActionReducerMapBuilder<UserProfileState>,
) => {
  builder
    .addCase(updateUserProfileAction.pending, (state) => {
      state.updateProfilePage.status = 'loading';
    })
    .addCase(updateUserProfileAction.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.updateProfilePage.status = 'failed';
        state.updateProfilePage.error = action.payload.error.message;
        state.updateProfilePage.errors = action.payload.error.errors;
        console.log('aaa');
        console.log(state.updateProfilePage.errors);
        console.log(state.updateProfilePage.error);
      } else {
        state.updateProfilePage.status = 'succeeded';
        state.updateProfilePage.data = action.payload.data;
      }
    })
    .addCase(updateUserProfileAction.rejected, (state, action) => {
      state.updateProfilePage.status = 'failed';
      state.updateProfilePage.error = action.error.message;
    })
    .addCase(resetUpdateProfileStatus, (state) => {
      state.updateProfilePage = {
        status: 'idle',
        data: undefined,
        error: undefined,
        errors: undefined,
      };
    });
};

export default updateUserProfileHandling;
