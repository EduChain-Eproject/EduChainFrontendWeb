import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { AuthState } from '../authSlice';
import { logInAction, logOutAction } from '../AuthAction';

const handleLogOut = (builder: ActionReducerMapBuilder<AuthState>) => {
  builder
    .addCase(logOutAction.fulfilled, (state) => {
      state.user = null;
      state.isAuthenticated = false;
    })
    .addCase(logOutAction.rejected, (state, action) => {
      state.logoutError = action.error.message!;
    });
};

export default handleLogOut;
