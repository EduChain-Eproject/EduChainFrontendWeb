import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { AuthState } from '../authSlice';
import { registerAction } from '../AuthAction';

const handleRegister = (builder: ActionReducerMapBuilder<AuthState>) => {
  builder
    .addCase(registerAction.pending, (state) => {
      state.signUpPage.status = 'loading';
      state.signUpPage.data = { message: undefined }; // Ensure data structure matches
      state.signUpPage.error = undefined;
    })
    .addCase(registerAction.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.signUpPage.status = 'failed';
        state.signUpPage.error = action.payload.error.message;
        state.signUpPage.errors = action.payload.error.errors;
        state.signUpPage.data = { message: undefined }; // Reset data structure on failure
        console.log(state.signUpPage.error);
      } else {
        state.signUpPage.status = 'succeeded';
        state.signUpPage.data = { message: action.payload.message }; // Assign message correctly
        console.log(state.signUpPage.data);
        state.signUpPage.error = undefined;
      }
    });
};

export default handleRegister;
