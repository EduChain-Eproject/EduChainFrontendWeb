import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { AuthState } from '../../authSlice';
import { resetVerifyPage, verifyCodeAction } from '../../AuthAction';

const handleVerifyCode = (builder: ActionReducerMapBuilder<AuthState>) => {
  builder
    .addCase(verifyCodeAction.pending, (state) => {
      state.verifyPage.status = 'loading';
    })
    .addCase(verifyCodeAction.fulfilled, (state, action) => {
      if (action.payload.error) {
        console.log(action.payload.error);
        state.verifyPage.status = 'failed';
        state.verifyPage.error = action.payload.error.message;
        state.verifyPage.errors = action.payload.error.errors;
        return;
      } else {
        state.verifyPage.status = 'succeeded';
      }
    })
    .addCase(resetVerifyPage, (state) => {
      state.verifyPage.status = 'idle';
      state.verifyPage.error = undefined;
      state.verifyPage.data = undefined;
      state.verifyPage.errors = undefined;
    });
};

export default handleVerifyCode;
