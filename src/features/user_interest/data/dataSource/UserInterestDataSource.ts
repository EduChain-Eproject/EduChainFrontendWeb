import axiosService from '../../../../common/services/axiosService';
import Failure from '../../../../common/entities/Failure';
import { DeleteUserInterestReq } from '../../domain/usecase/DeleteUserInterestUseCase';
import { GetUserInterestReq } from '../../domain/usecase/GetUserInterests UserCase';
import { AddUserInterestReq } from '../../domain/usecase/AddUserInterestUseCase';
import UserInterest from '../../../../common/entities/UserInterest';

const baseUrl: String = 'http://localhost:8080/STUDENT/';

export const apiTakeUserInterests = async (
  req: GetUserInterestReq,
): Promise<{
  totalPages: number;
  totalElements: number;
  content: UserInterest[];
}> => {
  try {
    const response = await axiosService.post(
      `${baseUrl}get-user-interest`,
      req,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
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



export const apiDeleteUserInterest = async (
  deleteReq: DeleteUserInterestReq,
): Promise<void> => {
  try {
    const response = await axiosService.delete(`${baseUrl}delete-wishlist`, {
      data: deleteReq,
    });
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

export const apiAddUserInterest = async (
  req: AddUserInterestReq,
): Promise<UserInterest> => {
  try {
    const response = await axiosService.post(`${baseUrl}add-to-wishlist`, req);
    return response.data;
  }  catch (error) {
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
