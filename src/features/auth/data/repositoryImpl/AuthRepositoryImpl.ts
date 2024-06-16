import Failure from '../../../../common/types/Failure';
import { ApiResponse, JwtResponse, LoginReq } from '../../domain/usecases/Login';
import { RegisterReq, RegisterResponseMessage } from '../../domain/usecases/Register';
import { logIn, registerUser } from '../dataSources/AuthRemoteDataSource';

import { AuthRepository } from './../../domain/repositories/AuthRepository';
class AuthRepositoryImpl implements AuthRepository{
    onLogout: () => {};
    onResetPassword: () => {};
  
    async onLogin(loginRequest: LoginReq): Promise<{ data?: ApiResponse<any>; error?: string }> {
        try {
            const response = await logIn(loginRequest);
            return { data: response };
        } catch (error) {
            if (error instanceof Failure) {
                
                return { error: error.message };
            }
            return { error: 'Unexpected error occurred' };
        }
    }

  async onRegister(registerRequest: RegisterReq) :Promise<{ message: RegisterResponseMessage; error?:string }>{
        try {
            const response = await registerUser(registerRequest);
            return { message:response };
          } catch (error) {
            return { message: error.message || 'Unknown error' };
          }
    }
 

}

export default AuthRepositoryImpl;