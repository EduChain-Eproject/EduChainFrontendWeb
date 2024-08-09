import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { AuthState } from '../../authSlice';
import { reSenVerifyCodeAction } from '../../AuthAction';

const HandleReSendVerifyCode = (
  builder: ActionReducerMapBuilder<AuthState>,
) => {
  builder
    .addCase(reSenVerifyCodeAction.pending, (state) => {
      state.reSendVerifyPage.status = 'loading';
    })
    .addCase(reSenVerifyCodeAction.fulfilled, (state, action) => {
      if (action.payload.error) {
        console.log(action.payload.error);
        state.reSendVerifyPage.status = 'failed';
        state.reSendVerifyPage.error = action.payload.error.message;
        state.reSendVerifyPage.errors = action.payload.error.errors;
        console.log(state.reSendVerifyPage.errors);
        console.log(state.reSendVerifyPage.error);
        console.log(action.payload.error);
        return;
      } else {
        state.reSendVerifyPage.status = 'succeeded';
      }
    });
};

export default HandleReSendVerifyCode;
