import { UserDto } from './../dtos/UserDto';
import Failure from '../../../../common/entities/Failure';
import { JwtResponse, LoginReq } from '../../domain/usecases/Login';
import {
  RegisterReq,
  RegisterResponseMessage,
} from '../../domain/usecases/Register';
import {
  resetPassword,
  logIn,
  logOut,
  registerUser,
  sendMailReset,
  verifyCode,
  reSendVerifyCode,
} from '../dataSources/AuthRemoteDataSource';

import { AuthRepository } from './../../domain/repositories/AuthRepository';
import { SendResetPasswordEmailReq } from '../../domain/usecases/SendResetPasswordEmail';
import { ResetPasswordReq } from '../../domain/usecases/ResetPassword';
import User from '../../../../common/entities/User';
import { LogOutReq } from '../../domain/usecases/LogOut';
import { getUserWithToken } from '../dataSources/userProfileDataSource';
import { ReSendVerifyCodeReq } from '../../domain/usecases/ResendVerifyCode';
import { VerifyRequest } from '../../domain/usecases/VerifyCode';

class AuthRepositoryImpl implements AuthRepository {
  async onLogin(loginRequest: LoginReq): Promise<{
    data?: JwtResponse;
    error?: {
      message: string;
      errors: { [key: string]: string };
      timestamp?: string;
    };
  }> {
    try {
      const response = await logIn(loginRequest);
      return { data: response };
    } catch (error) {
      if (error instanceof Failure) {
        return {
          error: {
            message: error.message,
            errors: error.errors,
            timestamp: error.timestamp,
          },
        };
      }
      return {
        error: {
          message: 'Unexpected error occurred on login',
          errors: { message: 'Unexpected error occurred' },
        },
      };
    }
  }

  async getUser(): Promise<{
    data?: User;
    error?: {
      message: string;
      errors: { [key: string]: string };
      timestamp?: string;
    };
  }> {
    try {
      const response: User = await getUserWithToken();
      return { data: response };
    } catch (error) {
      if (error instanceof Failure) {
        return {
          error: {
            message: error.message,
            errors: error.errors,
            timestamp: error.timestamp,
          },
        };
      }
      return {
        error: {
          message: 'Unexpected error occurred on getting user',
          errors: { message: 'Unexpected error occurred' },
        },
      };
    }
  }

  async onRegister(registerRequest: RegisterReq): Promise<{
    message?: string;
    error?: {
      message: string;
      errors: { [key: string]: string };
      timestamp?: string;
    };
  }> {
    try {
      const response = await registerUser(registerRequest);
      return { message: response };
    } catch (error) {
      if (error instanceof Failure) {
        return {
          error: {
            message: error.message,
            errors: error.errors,
            timestamp: error.timestamp,
          },
        };
      }
      return {
        error: {
          message: 'Unexpected error occurred on registration',
          errors: { message: 'Unexpected error occurred' },
        },
      };
    }
  }

  async onLogout(email: LogOutReq): Promise<{
    message?: string;
    error?: {
      message: string;
      errors: { [key: string]: string };
      timestamp?: string;
    };
  }> {
    try {
      const response = await logOut();
      return { message: response };
    } catch (error) {
      if (error instanceof Failure) {
        return {
          error: {
            message: error.message,
            errors: error.errors,
            timestamp: error.timestamp,
          },
        };
      }
      return {
        error: {
          message: 'Unexpected error occurred on logout',
          errors: { message: 'Unexpected error occurred' },
        },
      };
    }
  }

  async onSendResetPasswordEmail(req: SendResetPasswordEmailReq): Promise<{
    message?: RegisterResponseMessage;
    error?: {
      message: string;
      errors: { [key: string]: string };
      timestamp?: string;
    };
  }> {
    try {
      const response = await sendMailReset(req);
      return { message: response };
    } catch (error) {
      if (error instanceof Failure) {
        return {
          error: {
            message: error.message,
            errors: error.errors,
            timestamp: error.timestamp,
          },
        };
      }
      return {
        error: {
          message: 'Unexpected error occurred on sending reset password email',
          errors: { message: 'Unexpected error occurred' },
        },
      };
    }
  }

  async onResetPassword(req: ResetPasswordReq): Promise<{
    data?: any;
    error?: {
      message: string;
      errors: { [key: string]: string };
      timestamp?: string;
    };
  }> {
    try {
      const response = await resetPassword(req);
      return { data: response };
    } catch (error) {
      if (error instanceof Failure) {
        return {
          error: {
            message: error.message,
            errors: error.errors,
            timestamp: error.timestamp,
          },
        };
      }
      return {
        error: {
          message: 'Unexpected error occurred on resetting password',
          errors: { message: 'Unexpected error occurred' },
        },
      };
    }
  }

  async onVerifyCode(data: VerifyRequest): Promise<{
    data?: any;
    error?: {
      message: string;
      errors: { [key: string]: string };
      timestamp?: string;
    };
  }> {
    try {
      const response = await verifyCode(data);
      return response.data;
    } catch (error) {
      if (error instanceof Failure) {
        return {
          error: {
            message: error.message,
            errors: error.errors,
            timestamp: error.timestamp,
          },
        };
      }
      return {
        error: {
          message: 'Unexpected error occurred on login',
          errors: { message: 'Unexpected error occurred' },
        },
      };
    }
  }

  async onReSendVerifyCode(email: ReSendVerifyCodeReq): Promise<{
    data?: any;
    error?: {
      message: string;
      errors: { [key: string]: string };
      timestamp?: string;
    };
  }> {
    try {
      const response = await reSendVerifyCode(email);
      return response.data;
    } catch (error) {
      if (error instanceof Failure) {
        return {
          error: {
            message: error.message,
            errors: error.errors,
            timestamp: error.timestamp,
          },
        };
      }
      return {
        error: {
          message: 'Unexpected error occurred on login',
          errors: { message: 'Unexpected error occurred' },
        },
      };
    }
  }
}


export default AuthRepositoryImpl;
