import Failure from '../../../../common/entities/Failure';
import UserCourse from '../../../../common/entities/UserCourse';
import { UserCourseRepository } from '../../domain/repository/UserCourseRepository';
import { AddUserCourseReq } from '../../domain/usecase/AddUserCourseUseCase';
import { GetUserCourseRequest } from '../../domain/usecase/GetUserCourseUseCase';
import {
  apiAddUserCouse,
  apiGetUserCourse,
} from '../dataSrouce/UserCourseDataSrouce';

export class UserCourseRepositoryImpl implements UserCourseRepository {
  async getUserCourse(req: GetUserCourseRequest): Promise<{
    totalPages: number;
    totalElements: number;
    data?: UserCourse[];
    error?: {
      message: string;
      errors: { [key: string]: string };
      timestamp?: string;
    };
  }> {
    try {
      const response = await apiGetUserCourse(req);
      return {
        totalPages: response.totalPages,
        totalElements: response.totalElements,
        data: response.content,
      };
    } catch (error) {
      if (error instanceof Failure) {
        return {
          totalPages: 0,
          totalElements: 0,
          error: {
            message: error.message,
            errors: error.errors,
            timestamp: error.timestamp,
          },
        };
      }
      return {
        totalPages: 0,
        totalElements: 0,
        error: {
          message: 'Unexpected error occurred on login',
          errors: { message: 'Unexpected error occurred' },
        },
      };
    }
  }

  async addUserCourse(
    req: AddUserCourseReq,
  ): Promise<{ data?: UserCourse; error?: string }> {
    try {
      const response = await apiAddUserCouse(req);
      return { data: response };
    } catch (error) {
      return {
        error: 'Fail to fetch usercourse',
      };
    }
  }
}
