import { UserInterestDto } from './../dto/UserInterestDto';
import axiosService from '../../../../common/services/axiosService';
import Failure from '../../../../common/types/Failure';
import { DeleteUserInterestRes } from '../../domain/usecase/DeleteUserInterestUseCase';

const baseUrl: String = 'http://localhost:8080/STUDENT/';

export const apiGetUserInterests = async (): Promise<UserInterestDto[]> => {
  try {
    const response = await axiosService.get(`${baseUrl}get-user-interest`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Failure(error.response.data.message, error.response.status);
  }
};

export const apiDeleteUserInterest = async (
  deleteReq: DeleteUserInterestRes,
): Promise<void> => {
  try {
    const response = await axiosService.delete(`${baseUrl}delete-wishlist`, {
      data: deleteReq,
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to delete user interest: ${error.message}`);
  }
};
