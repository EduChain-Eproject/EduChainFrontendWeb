import { UserProfileModel } from './../../domain/entities/UserProfileModel';

import axiosService from '../../../../common/services/axiosService';
import Failure from '../../../../common/entities/Failure';

const baseUrl: String = 'http://localhost:8080/COMMON/';
export const getUserProfile = async (
  email: string,
): Promise<UserProfileModel> => {
  try {
    const respose = await axiosService.get(
      `${baseUrl}get-user-profile/${email}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log(respose.data);
    return respose.data;
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

export const updateUserProfile = async (
  req: FormData,
): Promise<{
  data: UserProfileModel;
}> => {
  try {
    const response = await axiosService.put(`${baseUrl}updateProfile`, req, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return { data: response.data };
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
