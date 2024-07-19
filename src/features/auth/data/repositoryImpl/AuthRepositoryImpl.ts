import { UserDto } from './../dtos/UserDto';
import Failure from '../../../../common/entities/Failure';
import {
  ApiResponse,
  JwtResponse,
  LoginReq,
} from '../../domain/usecases/Login';
import {
  RegisterReq,
  RegisterResponseMessage,
} from '../../domain/usecases/Register';
import {
  resetPassword,
  getUserWithToken,
  logIn,
  logOut,
  registerUser,
  sendMailReset,
} from '../dataSources/AuthRemoteDataSource';

import { AuthRepository } from './../../domain/repositories/AuthRepository';
import { SendResetPasswordEmailReq } from '../../domain/usecases/SendResetPasswordEmail';
import { ResetPasswordReq } from '../../domain/usecases/ResetPassword';
import User from '../../../../common/entities/User';
import { LogOutReq } from '../../domain/usecases/LogOut';
class AuthRepositoryImpl implements AuthRepository {
  async onLogin(
    loginRequest: LoginReq,
  ): Promise<{ data?: ApiResponse<JwtResponse>; error?: string }> {
    try {
      const response = await logIn(loginRequest);
      return { data: response };
    } catch (error) {
      if (error instanceof Failure) {
        return { error: error.message };
      }
      return { error: 'Unexpected error occurred on login' };
    }
  }
  async getUser(): Promise<{ data?: User; error?: string }> {
    try {
      const response: User = await getUserWithToken();

      return { data: response };
    } catch (error) {
      if (error instanceof Failure) {
        return { error: error.message };
      }
      return { error: 'Unexpected error occurred get User' };
    }
  }

  onRegister = async (
    registerRequest: RegisterReq,
  ): Promise<{ message: string | undefined; error?: string }> => {
    try {
      const response = await registerUser(registerRequest);
      return { message: response };
    } catch (error) {
      return { message: undefined, error: 'error: ' + error?.message };
    }
  };

  onLogout = async (
    email: LogOutReq,
  ): Promise<{ message: string; error?: string }> => {
    try {
      const response = await logOut(email);
      return { message: response };
    } catch (error) {
      return { message: error.message || 'unknown error' };
    }
  };
  async onSendResetPasswordEmail(
    req: SendResetPasswordEmailReq,
  ): Promise<{ message: RegisterResponseMessage; error?: string | undefined }> {
    try {
      const response = await sendMailReset(req);
      return { message: response };
    } catch (error) {
      return { message: error.message || 'unknow error' };
    }
  }

  async onResetPassword(
    req: ResetPasswordReq,
  ): Promise<{ data: any; error: string }> {
    try {
      const response = await resetPassword(req);
      return response.data;
    } catch (error) {
      return error.message || 'unknow error';
    }
  }
}

export default AuthRepositoryImpl;
