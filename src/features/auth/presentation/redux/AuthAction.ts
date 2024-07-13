import { createAsyncThunk } from '@reduxjs/toolkit';
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

export const ResetPasswrodAction = createAsyncThunk(
  'Auth/ResetPasswordAction',
  async ({ req }: { req: ResetPasswordReq }) => {
    const ResetPasswordCase = new ResetPassword(authRepository);
    return await ResetPasswordCase.excute(req);
  },
);
//lam action cho send ResetPasswordreq
