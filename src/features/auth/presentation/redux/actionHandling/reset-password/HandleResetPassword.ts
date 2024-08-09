import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { AuthState } from '../../authSlice';
import { ResetPasswordAction, resetPasswordPageAction } from '../../AuthAction';

const handleResetPassword = (builder: ActionReducerMapBuilder<AuthState>) => {
  builder
    .addCase(ResetPasswordAction.pending, (state) => {
      state.resetPasswordPage.status = 'loading';
    })
    .addCase(ResetPasswordAction.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.resetPasswordPage.status = 'failed';
        state.resetPasswordPage.error = action.payload.error.message;
        state.resetPasswordPage.errors = action.payload.error.errors;
        console.log(action.payload.error);
        return;
      } else {
        state.resetPasswordPage.status = 'succeeded';
      }
    })
    .addCase(resetPasswordPageAction, (state) => {
      state.resetPasswordPage.status = 'idle';
      state.resetPasswordPage.error = undefined;
      state.resetPasswordPage.data = undefined;
      state.resetPasswordPage.errors = undefined;
    });
};

export default handleResetPassword;
