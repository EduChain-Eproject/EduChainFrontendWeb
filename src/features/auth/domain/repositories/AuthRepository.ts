
import User from '../../../../common/entities/User';
import { JwtResponse, LoginReq } from '../usecases/Login';
import { LogOutReq } from '../usecases/LogOut';
import { RegisterReq, RegisterResponseMessage } from '../usecases/Register';
import { ReSendVerifyCodeReq } from '../usecases/ResendVerifyCode';
import { ResetPasswordReq } from '../usecases/ResetPassword';
import { SendResetPasswordEmailReq } from '../usecases/SendResetPasswordEmail';
import { VerifyRequest } from '../usecases/VerifyCode';

export interface AuthRepository {
  //login
  onLogin: (loginRequest: LoginReq) => Promise<{
    data?: JwtResponse;
    error?: {
      message: string;
      errors: { [key: string]: string };
      timestamp?: string;
    };
  }>;
  //registers
  onRegister: (registerRequest: RegisterReq) => Promise<{
    message?: string;
    error?: {
      message: string;
      errors: { [key: string]: string };
      timestamp?: string;
    };
  }>;
  //
  onLogout: (data: LogOutReq) => Promise<{
    message?: string;
    error?: {
      message: string;
      errors: { [key: string]: string };
      timestamp?: string;
    };
  }>;
  //
  getUser: () => Promise<{
    data?: User;
    error?: {
      message: string;
      errors: { [key: string]: string };
      timestamp?: string;
    };
  }>;
  onSendResetPasswordEmail: (req: SendResetPasswordEmailReq) => Promise<{
    data?: any;
    error?: {
      message: string;
      errors: { [key: string]: string };
      timestamp?: string;
    };
  }>;

  onResetPassword: (req: ResetPasswordReq) => Promise<{
    data?: any;
    error?: {
      message: string;
      errors: { [key: string]: string };
      timestamp?: string;
    };
  }>;

  onVerifyCode: (req: VerifyRequest) => Promise<{
    data?: any;
    error?: {
      message: string;
      errors: { [key: string]: string };
      timestamp?: string;
    };
  }>;

  onReSendVerifyCode: (email: ReSendVerifyCodeReq) => Promise<{
    data?: any;
    error?: {
      message: string;
      errors: { [key: string]: string };
      timestamp?: string;
    };
  }>;
}
