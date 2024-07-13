import { User } from '../entities/User';
import { ApiResponse, JwtResponse, LoginReq } from '../usecases/Login';
import { RegisterReq, RegisterResponseMessage } from '../usecases/Register';
import { ResetPasswordReq } from '../usecases/ResetPassword';
import { SendResetPasswordEmailReq } from '../usecases/SendResetPasswordEmail';

export interface AuthRepository {
  //login
  onLogin: (
    loginRequest: LoginReq,
  ) => Promise<{ data?: ApiResponse<JwtResponse>; error?: string }>;
  //registers
  onRegister: (
    registerRequest: RegisterReq,
  ) => Promise<{ message: RegisterResponseMessage; error?: string }>;
  //
  onLogout: (
    email: string,
  ) => Promise<{ message: RegisterResponseMessage; error?: string }>;
  //
  getUser: () => Promise<{ data?: User; error?: string }>;
  onSendResetPasswordEmail: (
    req: SendResetPasswordEmailReq,
  ) => Promise<{ data?: any; error?: string }>;

  onResetPassword: (
    req: ResetPasswordReq,
  ) => Promise<{ data: any; error: string }>;
}
