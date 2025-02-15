import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import {
  setUserWalletAction,
} from '../UserProfileAction';
import { UserProfileState } from '../UserProfileSlice';

const setUserWalletHandling = (
  builder: ActionReducerMapBuilder<UserProfileState>,
) => {
  builder
    .addCase(setUserWalletAction.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.profilePage.status = 'failed';
        state.profilePage.error = 'failed to set wallet address' + action.payload.error.message;
        state.profilePage.errors = action.payload.error.errors;
      } else {
        state.profilePage.status = 'succeeded';
        console.log(state.profilePage.data);
        if (state.profilePage.data) {
          state.profilePage.data = {
            ...state.profilePage.data,
            walletAddress: action.payload.data?.walletAddress,
          };

        }
      }
    })
    .addCase(setUserWalletAction.rejected, (state, action) => {
      state.profilePage.status = 'failed';
      state.profilePage.error = action.error.message;
    });
};

export default setUserWalletHandling;
