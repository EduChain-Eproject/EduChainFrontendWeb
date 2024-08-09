import { resetPassword } from './../../data/dataSources/AuthRemoteDataSource';
import {
  ActionReducerMapBuilder,
  createAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import AuthRepositoryImpl from '../../data/repositoryImpl/AuthRepositoryImpl';

import { AuthRepository } from './../../domain/repositories/AuthRepository';
import Register, { RegisterReq } from '../../domain/usecases/Register';
import Login, { LoginReq } from '../../domain/usecases/Login';
import GetUser from '../../domain/usecases/GetUser';
import { SendResetPasswordEmailReq } from '../../domain/usecases/SendResetPasswordEmail';
import SendEmailResetPassword from '../../domain/usecases/SendResetPasswordEmail';
import ResetPassword, {
  ResetPasswordReq,
} from '../../domain/usecases/ResetPassword';
import Failure from '../../../../common/entities/Failure';
import axiosService from '../../../../common/services/axiosService';
import { AuthState } from './authSlice';
import { logOut } from '../../data/dataSources/AuthRemoteDataSource';
import LogOut, { LogOutReq } from '../../domain/usecases/LogOut';
import VerifyCode from '../../domain/usecases/VerifyCode';
import ReSendVerifyCode, {
  ReSendVerifyCodeReq,
} from '../../domain/usecases/ResendVerifyCode';

const authRepository: AuthRepository = new AuthRepositoryImpl();

export const getUserAction = createAsyncThunk(
  'Auth/getUserAction',
  async () => {
    const loginCase = new GetUser(authRepository);
    return await loginCase.execute();
  },
);

export const logInAction = createAsyncThunk(
  'Auth/login',
  async ({ loginReq }: { loginReq: LoginReq }) => {
    const loginCase = new Login(authRepository);
    return await loginCase.execute(loginReq);
  },
);

export const registerAction = createAsyncThunk(
  'Auth/register',
  async ({ registerReq }: { registerReq: RegisterReq }) => {
    const registerCase = new Register(authRepository);
    return await registerCase.execute(registerReq);
  },
);

export const SendResetPasswordEmailAction = createAsyncThunk(
  'Auth/SendresetPasswordEmailAction',
  async ({ req }: { req: SendResetPasswordEmailReq }) => {
    const sendEmailCase = new SendEmailResetPassword(authRepository);
    return await sendEmailCase.execute(req);
  },
);

export const ResetPasswordAction = createAsyncThunk(
  'Auth/ResetPasswordAction',
  async ({ req }: { req: ResetPasswordReq }) => {
    const ResetPasswordCase = new ResetPassword(authRepository);
    return await ResetPasswordCase.excute(req);
  },
);

export const logOutAction = createAsyncThunk(
  'Auth/logOut',
  async (data: LogOutReq) => {
    const logtOutCase = new LogOut(authRepository);
    return await logtOutCase.execute(data);
  },
);
export const resetSignUpStatus = createAction('auth/resetSignUpStatus');

export const verifyCodeAction = createAsyncThunk(
  'Auth/verify',
  async (data: number) => {
    const verifyCase = new VerifyCode(authRepository);
    return await verifyCase.execute(data);
  },
);

export const reSenVerifyCodeAction = createAsyncThunk(
  'Auth/resend-verify',
  async (email: ReSendVerifyCodeReq) => {
    const resendVerifyCase = new ReSendVerifyCode(authRepository);
    return await resendVerifyCase.execute(email);
  },
);

export const resetSendEmailResetPassword = createAction(
  'auth/resetSendEmailResetPassword',
);
export const resetVerifyPage = createAction('auth/resetVerifyPage');
export const resetPasswordPageAction = createAction('auth/resetPasswordPage');
