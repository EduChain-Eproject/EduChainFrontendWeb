import Failure from '../../../../common/entities/Failure';
import axiosService from '../../../../common/services/axiosService';
import { AddUserCourseReq } from '../../domain/usecase/AddUserCourseUseCase';
import { GetUserCourseRequest } from '../../domain/usecase/GetUserCourseUseCase';
import { UserCourseDTO } from '../dto/UserCourseDTO';

const baseUrl: String = 'http://localhost:8080/STUDENT/';

export const apiGetUserCourse = async (
  req: GetUserCourseRequest,
): Promise<{
  totalPages: number;
  totalElements: number;
  content: UserCourseDTO[];
}> => {
  try {
    const response = await axiosService.post(`${baseUrl}all-user-course`, req, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data.content);
    return {
      totalPages: response.data.totalPages,
      totalElements: response.data.totalElements,
      content: response.data.content,
    };
  }catch (error) {
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

export const apiAddUserCouse = async (
  req: AddUserCourseReq,
): Promise<UserCourseDTO> => {
  try {
    const response = await axiosService.post(`${baseUrl}add-user-course`, req, {
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
