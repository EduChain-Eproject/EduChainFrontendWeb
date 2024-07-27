import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { AuthState } from "../authSlice";
import { logInAction } from "../AuthAction";
import { ValidationError } from '../../../../../common/state/ValidationFailure';

const handleLogin = (builder: ActionReducerMapBuilder<AuthState>) => {
  builder
    .addCase(logInAction.pending, (state) => {
      state.logInPage.status = 'loading';
    })
    .addCase(logInAction.fulfilled, (state, action) => {
      if (action.payload.error) {
        console.log(action.payload.error.type);
        if (action.payload.error.type === 'validation') {
          state.logInPage.status = 'failed';
          state.logInPage.error = {
            type: 'validation',
            errors: action.payload.error.errors,
          } as ValidationError;
          console.log(typeof state.logInPage.error);
        } else {
          state.logInPage.status = 'failed';
          state.logInPage.error = action.payload.error;
          console.log(state.logInPage.error);
        }
      } else {
        state.logInPage.status = 'succeeded';
        if (action.payload.data) {
          state.isAuthenticated = true;
          localStorage.setItem(
            'accessToken',
            action.payload.data.object.accessToken.toString(),
          );
          localStorage.setItem(
            'refreshToken',
            action.payload.data.object.refreshToken.toString(),
          );
        }
      }
    })
    .addCase(logInAction.rejected, (state, action) => {
      state.logInPage.status = 'failed';
      state.logInPage.error = action.error.message;
    });
};

export default handleLogin;