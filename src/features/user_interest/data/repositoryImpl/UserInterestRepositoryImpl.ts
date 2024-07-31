import { UserInterestDto } from './../dto/UserInterestDto';
import { UserProfileModel } from './../../../userprofile/domain/entities/UserProfileModel';
// import { UserInterestModel } from './../../domain/entities/UserInterestModel';
import Failure from '../../../../common/entities/Failure';
import {
  apiAddUserInterest,
  apiDeleteUserInterest,
  apiTakeUserInterests,
} from '../dataSource/UserInterestDataSource';
import { UserInterest } from '../../domain/entities/UserInterest';
import { DeleteUserInterestRes } from '../../domain/usecase/DeleteUserInterestUseCase';
import { GetUserInterestReq } from '../../domain/usecase/GetUserInterests UserCase';
import { UserInterestRepository } from '../../domain/repository/UserInterestRepository';
import { AddUserInterestReq } from '../../domain/usecase/AddUserInterestUseCase';

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
      console.log(response);
      const userInterests = response.content.map((dto: UserInterestDto) =>
        this.mapDtoToEntity(dto),
      );
      return {
        totalPages: response.totalPages,
        totalElements: response.totalElements,
        data: userInterests,
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

  async deleteUserInterests(deleteReq: DeleteUserInterestRes): Promise<{
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
      const userInterest = this.mapDtoToEntity(response);
      return { data: userInterest };
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

  private mapDtoToEntity(dto: UserInterestDto): UserInterest {
    return {
      course_id: dto.course_id,
      student_id: dto.student_id,
      description: dto.description,
      title: dto.title,
      price: dto.price,
      teacherName: dto.teacherName,
      categoryList: dto.categoryList,
    };
  }
}

export default UserInterestRepositoryImpl;
