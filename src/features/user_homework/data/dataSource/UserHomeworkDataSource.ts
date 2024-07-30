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
    throw new Failure(error.response.data.message, error.response.status);
  }
};
