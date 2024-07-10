import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import AuthRepositoryImpl from '../../data/repositories/AuthRepositoryImpl';
// import LoginUser from '../../domain/usecases/LoginUser';
// import LogoutUser from '../../domain/usecases/LogoutUser';
// import CheckAuth from '../../domain/usecases/CheckAuth';
import { User } from '../../domain/entities/User.ts';
import handleLogin from './actionHandling/HandleLogin.ts';
import {
  CommonState,
  initCommonState,
} from '../../../../common/state/index.ts';
import handleGetUser from './actionHandling/HandleGetUser.ts';
import handleSendMailReset from './actionHandling/HandleSendMailReset.ts';
import handleResetPassword from './actionHandling/HandleResetPassword.ts';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  refreshToken: string | null;
  logInPage: CommonState<null>;
  signUpPage: CommonState<null>;
  sendMailPage: CommonState<null>;
  resetPasswordPage: CommonState<null>;
  verifyPage: CommonState<null>;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: localStorage.getItem('accessToken') != null,
  token: localStorage.getItem('accessToken'),
  refreshToken: null,
  logInPage: initCommonState,
  sendMailPage: initCommonState,
  signUpPage: initCommonState,
  resetPasswordPage: initCommonState,
  verifyPage: initCommonState,
};

// const authRepository = new AuthRepositoryImpl();
// const loginUser = new LoginUser(authRepository);
// const logoutUser = new LogoutUser(authRepository);
// const checkAuth = new CheckAuth(authRepository);

// export const authenticateUser = createAsyncThunk(
//   'auth/authenticateUser',
//   async ({ email, password }: { email: string; password: string }) => {
//     const userData = await loginUser.execute({ email, password });
//     authRepository.saveAccessToken(userData.accessToken);
//     authRepository.saveRefreshToken(userData.refreshToken);
//     return userData;
//   }
// );

// export const signOutUser = createAsyncThunk('auth/signOutUser', async () => {
//   await logoutUser.execute();
//   authRepository.removeTokens();
// });

// export const verifyAuth = createAsyncThunk('auth/verifyAuth', async () => {
//   const isAuthenticated = await checkAuth.execute();
//   return isAuthenticated;
// });

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder
    //   .addCase(authenticateUser.pending, (state) => {
    //     state.status = 'loading';
    //   })
    //   .addCase(authenticateUser.fulfilled, (state, action) => {
    //     state.status = 'succeeded';
    //     state.isAuthenticated = true;
    //     state.user = action.payload.user;
    //   })
    //   .addCase(authenticateUser.rejected, (state, action) => {
    //     state.status = 'failed';
    //     state.error = action.error.message;
    //   })
    //   .addCase(signOutUser.fulfilled, (state) => {
    //     state.isAuthenticated = false;
    //     state.user = null;
    //   })
    //   .addCase(verifyAuth.fulfilled, (state, action) => {
    //     state.isAuthenticated = action.payload;
    //   });
    handleLogin(builder);
    handleGetUser(builder);
    handleSendMailReset(builder);
    handleResetPassword(builder);
  },
});

export default authSlice.reducer;
