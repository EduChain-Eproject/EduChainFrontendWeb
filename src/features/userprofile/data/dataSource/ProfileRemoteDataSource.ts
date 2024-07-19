import { UserProfileDto } from './../dto/UserProfileDto';
import axiosService from '../../../../common/services/axiosService';
import Failure from '../../../../common/entities/Failure';
import { UpdateUserProfileReq } from '../../domain/usecases/UpdateUserProfileUseCase';

const baseUrl: String = 'http://localhost:8080/COMMON/';
export const getUserProfile = async (
  email: string,
): Promise<UserProfileDto> => {
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
    throw new Failure(error.response.data.message, error.response.status);
  }
};

export const updateUserProfile = async (
  req: FormData,
): Promise<{
  content: UserProfileDto;
}> => {
  try {
    const respose = await axiosService.post(`${baseUrl}updateProfile`, req);
    return respose.data;
  } catch (error) {
    throw new Failure(error.response.data.message, error.response.status);
  }
};
