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
    console.log(req);
    return response.data;
  } catch (error) {
    throw new Failure(error.response.data.message, error.response.status);
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
