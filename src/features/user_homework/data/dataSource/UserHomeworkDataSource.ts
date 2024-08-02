import { UserHomeworkRequest } from '../../domain/usecase/UserHomeworkUsecase';
import { UserHomeworkDto } from '../dto/UserHomeworkDto';
import axiosService from '../../../../common/services/axiosService';
import Failure from '../../../../common/entities/Failure';
const baseUrl: String = 'http://localhost:8080/STUDENT/';

export const apiTakeUserHomeworks = async (
  req: UserHomeworkRequest,
): Promise<{
  totalPages: number;
  totalElements: number;
  content: UserHomeworkDto[];
}> => {
  try {
    const response = await axiosService.post(`${baseUrl}list-homework`, req, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(req);
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
