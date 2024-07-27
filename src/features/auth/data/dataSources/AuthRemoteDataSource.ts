import axiosService from '../../../../common/services/axiosService';
import Failure from '../../../../common/entities/Failure';
import { LoginReq } from '../../domain/usecases/Login';
import { RegisterReq } from '../../domain/usecases/Register';
import { ResetPasswordReq } from '../../domain/usecases/ResetPassword';
import { SendResetPasswordEmailReq } from '../../domain/usecases/SendResetPasswordEmail';
import { LogOutReq } from '../../domain/usecases/LogOut';


const baseUrl = 'http://localhost:8080/';
export const logIn = async (loginRequest: LoginReq) => {
  try {
    const response = await axiosService.post(
      `${baseUrl}Auth/login`,
      loginRequest,
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const errorData = error.response.data;
      if (errorData.type === 'validation') {
        console.log('Validation errors:', errorData.errors);
        return { type: 'validation', errors: errorData.errors };
      } else if (errorData.type == null || undefined) {
        console.log('Failure error:', errorData.message);
        return { type: 'failure', message: errorData.message };
      }
    }
    console.log('Unexpected error:', error.message);
    return { type: 'unknown', message: 'An unexpected error occurred' };
  }
};


export const getUserWithToken = async () => {
  try {
    const response = await axiosService.get(`${baseUrl}COMMON/getUser`);
    return response.data;
  } catch (error) {
    throw new Failure(error.response.data.message, error.response.status);
  }
};

export const registerUser = async (registerRequest: RegisterReq) => {
  try {
    const response = await axiosService.post(
      `${baseUrl}Auth/register`,
      registerRequest,
    );

    return response.data;
  } catch (error) {
    console.log(error.status);
    console.log(error.response.data);
    throw new Failure(error.response.data, error.response.status);
  }
};

// export const logOut = async (email: LogOutReq) => {
//   try {
//     const response = await axiosService.post(`${baseUrl}Auth/logout`, email);
//     return response.data;
//   } catch (error) {
//     throw new Failure(error.response.data.message, error.response.status);
//   }
// };

export const logOut = async () => {
  try {
    const response = await axiosService.post(`${baseUrl}Auth/logout`);
    return response.data;
  } catch (error) {
    throw new Failure(error.response.data.message, error.response.status);
  }
};

export const sendMailReset = async (req: SendResetPasswordEmailReq) => {
  try {
    const response = await axiosService.post(`${baseUrl}Auth/send_mail`, req);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Failure(error.response.data.message, error.response.status);
  }
};

export const resetPassword = async (req: ResetPasswordReq) => {
  try {
    const response = await axiosService.post(
      `${baseUrl}Auth/reset_password`,
      req,
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Failure(error.response.data.message, error.response.status);
  }
};

