import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { AuthState } from "../authSlice";
import { logInAction } from "../AuthAction";
import { ValidationError } from '../../../../../common/state/ValidationFailure';
import { act } from 'react';

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
          state.logInPage.errors = action.payload.error;
        } else {
          state.logInPage.status = 'failed';
          state.logInPage.error = action.payload.error.message;
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
      if (action.error.message) {
        state.logInPage.error = action.error.message;
      }
    });
};

export default handleLogin;