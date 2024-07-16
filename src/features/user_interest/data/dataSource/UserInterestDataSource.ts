import { UserInterestDto } from './../dto/UserInterestDto';
import axiosService from '../../../../common/services/axiosService';
import Failure from '../../../../common/types/Failure';
import { DeleteUserInterestRes } from '../../domain/usecase/DeleteUserInterestUseCase';
import { GetUserInterestReq } from '../../domain/usecase/GetUserInterests UserCase';

const baseUrl: String = 'http://localhost:8080/STUDENT/';

export const apiTakeUserInterests = async (
  req: GetUserInterestReq,
): Promise<{ content: UserInterestDto[] }> => {
  try {
    const response = await axiosService.post(
      `${baseUrl}get-user-interest`,
      req,
    );
    console.log(response.data);
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
