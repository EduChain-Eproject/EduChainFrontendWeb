import axiosService from '../../../../common/services/axiosService';
import Failure from '../../../../common/entities/Failure';
import { UpdateUserProfileReq } from '../../domain/usecases/UpdateUserProfileUseCase';

const baseUrl: String = 'http://localhost:8080/COMMON/';
export const getUserProfile = async (email: string) => {
  try {
    const respose = await axiosService.get(
      `${baseUrl}get-user-profile/${email}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return respose.data;
  } catch (error) {
    throw new Failure(error.response.data.message, error.response.status);
  }
};

export const updateUserProfile = async (updateUserProfileReq: any) => {
  try {
    const respose = await axiosService.post(
      `${baseUrl}updateProfile`,
      updateUserProfileReq,
    );
    return respose.data;
  } catch (error) {
    throw new Failure(error.response.data.message, error.response.status);
  }
};
