import {
  apiAddUserInterest,
  apiDeleteUserInterest,
  apiTakeUserInterests,
} from '../dataSource/UserInterestDataSource';

import { DeleteUserInterestReq } from '../../domain/usecase/DeleteUserInterestUseCase';
import { GetUserInterestReq } from '../../domain/usecase/GetUserInterests UserCase';
import { UserInterestRepository } from '../../domain/repository/UserInterestRepository';
import { AddUserInterestReq } from '../../domain/usecase/AddUserInterestUseCase';
import UserInterest from '../../../../common/entities/UserInterest';
import Failure from '../../../../common/entities/Failure';

export class UserInterestRepositoryImpl implements UserInterestRepository {
  async getUserInterests(userInterest: GetUserInterestReq): Promise<{
    totalPages: number;
    totalElements: number;
    data?: UserInterest[];
    error?: {
      message: string;
      errors: { [key: string]: string };
      timestamp?: string;
    };
  }> {
    try {
      const response = await apiTakeUserInterests(userInterest);

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

  async deleteUserInterests(deleteReq: DeleteUserInterestReq): Promise<{
    data?: boolean;
    error?: {
      message: string;
      errors: { [key: string]: string };
      timestamp?: string;
    };
  }> {
    try {
      await apiDeleteUserInterest(deleteReq);
      return { data: true };
    } catch (error) {
      if (error instanceof Failure) {
        return {
          error: {
            message: error.message,
            errors: error.errors,
            timestamp: error.timestamp,
          },
        };
      }
      return {
        error: {
          message: 'Unexpected error occurred on login',
          errors: { message: 'Unexpected error occurred' },
        },
      };
    }
  }

  async addUserInterests(req: AddUserInterestReq): Promise<{
    data?: UserInterest;
    error?: {
      message: string;
      errors: { [key: string]: string };
      timestamp?: string;
    };
  }> {
    try {
      const response = await apiAddUserInterest(req);
      return { data: response };
    } catch (error) {
      if (error instanceof Failure) {
        return {
          error: {
            message: error.message,
            errors: error.errors,
            timestamp: error.timestamp,
          },
        };
      }
      return {
        error: {
          message: 'Unexpected error occurred on login',
          errors: { message: 'Unexpected error occurred' },
        },
      };
    }
  }
}

export default UserInterestRepositoryImpl;
