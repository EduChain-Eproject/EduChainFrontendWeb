import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { AuthState } from '../authSlice';
import { ResetPasswrodAction } from '../AuthAction';

const handleResetPassword = (builder: ActionReducerMapBuilder<AuthState>) => {
  builder
    .addCase(ResetPasswrodAction.pending, (state) => {
      state.resetPasswordPage.status = 'loading';
    })
    .addCase(ResetPasswrodAction.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.resetPasswordPage.status = 'failed';
        state.resetPasswordPage.error = action.payload.error;
        console.log(action.payload.error);
        return;
      } else {
        state.resetPasswordPage.status = 'succeeded';
      }
    });
};

export default handleResetPassword;
