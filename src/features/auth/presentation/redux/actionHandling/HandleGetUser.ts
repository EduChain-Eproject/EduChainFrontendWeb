import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { AuthState } from '../authSlice';
import { getUserAction } from '../AuthAction';

const handleGetUser = (builder: ActionReducerMapBuilder<AuthState>) => {
  builder
    .addCase(getUserAction.pending, (state) => {
      state.logInPage.status = 'loading';
    })
    .addCase(getUserAction.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.logInPage.status = 'failed';
        state.logInPage.error = action.payload.error;
        console.log(action.payload.error);
        return;
      } else {
        state.logInPage.status = 'login succeeded';
        if (action.payload.data) {
          console.log(action.payload.data);
          state.user = action.payload.data;
        }
      }
    });
};

export default handleGetUser;
