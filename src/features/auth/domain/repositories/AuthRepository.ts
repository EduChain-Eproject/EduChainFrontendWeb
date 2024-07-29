import Failure from '../../../../common/entities/Failure';
import { User } from '../../../../common/entities/User';
import { ValidationError } from '../../../../common/state/ValidationFailure';
import { ApiResponse, JwtResponse, LoginReq } from '../usecases/Login';
import { LogOutReq } from '../usecases/LogOut';
import { RegisterReq, RegisterResponseMessage } from '../usecases/Register';
import { ResetPasswordReq } from '../usecases/ResetPassword';
import { SendResetPasswordEmailReq } from '../usecases/SendResetPasswordEmail';

export interface AuthRepository {
  //login
  onLogin: (loginRequest: LoginReq) => Promise<{
    data?: ApiResponse<JwtResponse>;
    error?: Record<string, string>;
  }>;
  //registers
  onRegister: (
    registerRequest: RegisterReq,
  ) => Promise<{ message?: string; error?: string }>;
  //
  onLogout: (data: LogOutReq) => Promise<{ message: string; error?: string }>;
  //
  getUser: () => Promise<{ data?: User; error?: string }>;
  onSendResetPasswordEmail: (
    req: SendResetPasswordEmailReq,
  ) => Promise<{ data?: any; error?: string }>;

  onResetPassword: (
    req: ResetPasswordReq,
  ) => Promise<{ data: any; error: string }>;
}
