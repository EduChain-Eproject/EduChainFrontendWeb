import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { AuthState } from '../../authSlice';
import {
  resetSendEmailResetPassword,
  SendResetPasswordEmailAction,
} from '../../AuthAction';

const handleSendMailReset = (builder: ActionReducerMapBuilder<AuthState>) => {
  builder
    .addCase(SendResetPasswordEmailAction.pending, (state) => {
      state.sendMailPage.status = 'loading';
    })
    .addCase(SendResetPasswordEmailAction.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.sendMailPage.status = 'failed';
        state.sendMailPage.error = action.payload.error.message;
        state.sendMailPage.errors = action.payload.error.errors;
        console.log(action.payload.error);
        return;
      } else {
        state.sendMailPage.status = 'succeeded';
      }
    })
    .addCase(resetSendEmailResetPassword, (state) => {
      state.sendMailPage.status = 'idle';
      state.sendMailPage.error = undefined;
      state.sendMailPage!.data = null;
      state.sendMailPage.errors = undefined;
    });
};

export default handleSendMailReset;
