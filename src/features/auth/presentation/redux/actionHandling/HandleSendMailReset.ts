import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { AuthState } from '../authSlice';
import { SendResetPasswordEmailAction } from '../AuthAction';

const handleSendMailReset = (builder: ActionReducerMapBuilder<AuthState>) => {
  builder
    .addCase(SendResetPasswordEmailAction.pending, (state) => {
      state.sendMailPage.status = 'loading';
    })
    .addCase(SendResetPasswordEmailAction.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.sendMailPage.status = 'failed';
        state.sendMailPage.error = action.payload.error;
        console.log(action.payload.error);
        return;
      } else {
        state.resetPasswordPage.status = 'succeeded';
      }
    });
};

export default handleSendMailReset;

// this is belong to login
