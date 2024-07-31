import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { AuthState } from '../authSlice';
import { registerAction, resetSignUpStatus } from '../AuthAction';

const handleRegister = (builder: ActionReducerMapBuilder<AuthState>) => {
  builder
    .addCase(registerAction.pending, (state) => {
      state.signUpPage.status = 'loading';
      state.signUpPage.data = { message: undefined };
      state.signUpPage.error = undefined;
    })
    .addCase(registerAction.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.signUpPage.status = 'failed';
        state.signUpPage.error = action.payload.error.message;
        state.signUpPage.errors = action.payload.error.errors;
        state.signUpPage.data = { message: undefined };
        console.log(state.signUpPage.error);
      } else {
        state.signUpPage.status = 'succeeded';
        state.signUpPage.data = { message: action.payload.message };
        console.log(state.signUpPage.data);
        state.signUpPage.error = undefined;
      }
    })
    .addCase(resetSignUpStatus, (state) => {
      state.signUpPage.status = 'idle';
      state.signUpPage.error = undefined;
      state.signUpPage.data = { message: undefined };
      state.signUpPage.errors = undefined;
    });
};

export default handleRegister;
