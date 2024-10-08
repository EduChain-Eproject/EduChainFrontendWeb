import {
  createSlice,
  createAsyncThunk,
  ActionReducerMapBuilder,
} from '@reduxjs/toolkit';
// import AuthRepositoryImpl from '../../data/repositories/AuthRepositoryImpl';
// import LoginUser from '../../domain/usecases/LoginUser';
// import LogoutUser from '../../domain/usecases/LogoutUser';
// import CheckAuth from '../../domain/usecases/CheckAuth';
import handleLogin from './actionHandling/HandleLogin';
import { CommonState, initCommonState } from '../../../../common/state/index';
import handleGetUser from './actionHandling/HandleGetUser';
import handleSendMailReset from './actionHandling/HandleSendMailReset';
import handleResetPassword from './actionHandling/HandleResetPassword';
import { User } from '../../../../common/entities/User';
import AuthRepositoryImpl from '../../data/repositoryImpl/AuthRepositoryImpl';

import handleRegister from './actionHandling/HandleRegister';
import handleLogOut from './actionHandling/HandleLogout';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  refreshToken: string | null;
  logoutError: string | null;
  logInPage: CommonState<null>;
  signUpPage: CommonState<{ message: string | undefined }>;
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
  logoutError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleLogin(builder);
    handleGetUser(builder);
    handleSendMailReset(builder);
    handleResetPassword(builder);
    handleLogOut(builder);
    handleRegister(builder);
  },
});

export default authSlice.reducer;
