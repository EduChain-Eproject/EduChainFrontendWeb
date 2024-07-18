import axiosService from '../../../../common/services/axiosService';
import Failure from '../../../../common/entities/Failure';
import { LoginReq } from '../../domain/usecases/Login';
import { RegisterReq } from '../../domain/usecases/Register';
import { ResetPasswordReq } from '../../domain/usecases/ResetPassword';
import { SendResetPasswordEmailReq } from '../../domain/usecases/SendResetPasswordEmail';

export const logIn = async (loginRequest: LoginReq) => {
  try {
    const response = await axiosService.post(`/Auth/login`, loginRequest);
    return response.data;
  } catch (error) {
    throw new Failure(error.response.data.message, error.response.status);
  }
};

export const getUserWithToken = async () => {
  try {
    const response = await axiosService.get(`/COMMON/getUser`);
    return response.data;
  } catch (error) {
    throw new Failure(error.response.data.message, error.response.status);
  }
};

export const registerUser = async (registerRequest: RegisterReq) => {
  try {
    const response = await axiosService.post(
      `/Auth/register`,
      registerRequest,
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    throw new Failure(error.response.data.message, error.response.status);
  }
};

export const logOut = async () => {
  try {
    await axiosService.post(`/Auth/logout`);
    return;
  } catch (error) {
    throw new Failure(error.response.data.message, error.response.status);
  }
};

export const sendMailReset = async (req: SendResetPasswordEmailReq) => {
  try {
    const response = await axiosService.post(`/Auth/send_mail`, req);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Failure(error.response.data.message, error.response.status);
  }
};

export const resetPassword = async (req: ResetPasswordReq) => {
  try {
    const response = await axiosService.post(`/Auth/reset_password`, req);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Failure(error.response.data.message, error.response.status);
  }
};

