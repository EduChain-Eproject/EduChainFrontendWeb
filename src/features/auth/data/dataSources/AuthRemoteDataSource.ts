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
      const data = error.response.data;
      const message = data.errors.message || 'Validation error';
      const errors = data.errors;

      throw new Failure(message, errors, data.timestamp);
    }
    throw new Failure('An unknown error occurred', {
      message: 'An unknown error occurred',
    });
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
    if (error.response) {
      const data = error.response.data;
      const message = data.errors.message || 'Validation error';
      const errors = data.errors;

      throw new Failure(message, errors, data.timestamp);
    }
    throw new Failure('An unknown error occurred', {
      message: 'An unknown error occurred',
    });
  }
};

export const logOut = async (email: LogOutReq) => {
  try {
    const response = await axiosService.post(`${baseUrl}Auth/logout`, email);
    return response.data;
  } catch (error) {
    if (error.response) {
      const data = error.response.data;
      const message = data.errors.message || 'Validation error';
      const errors = data.errors;

      throw new Failure(message, errors, data.timestamp);
    }
    throw new Failure('An unknown error occurred', {
      message: 'An unknown error occurred',
    });
  }
};

export const sendMailReset = async (req: SendResetPasswordEmailReq) => {
  try {
    const response = await axiosService.post(`${baseUrl}Auth/send_mail`, req);
    return response.data;
  } catch (error) {
    if (error.response) {
      const data = error.response.data;
      const message = data.errors.message || 'Validation error';
      const errors = data.errors;

      throw new Failure(message, errors, data.timestamp);
    }
    throw new Failure('An unknown error occurred', {
      message: 'An unknown error occurred',
    });
  }
};

export const resetPassword = async (req: ResetPasswordReq) => {
  try {
    const response = await axiosService.post(
      `${baseUrl}Auth/reset_password`,
      req,
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const data = error.response.data;
      const message = data.errors.message || 'Validation error';
      const errors = data.errors;

      throw new Failure(message, errors, data.timestamp);
    }
    throw new Failure('An unknown error occurred', {
      message: 'An unknown error occurred',
    });
  }
};
