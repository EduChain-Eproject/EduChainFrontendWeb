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

export class UserInterestRepositoryImpl implements UserInterestRepository {
  async getUserInterests(userInterest: GetUserInterestReq): Promise<{
    totalPages: number;
    totalElements: number;
    data?: UserInterest[];
    error?: string;
  }> {
    try {
      const response = await apiTakeUserInterests(userInterest);

      return {
        totalPages: response.totalPages,
        totalElements: response.totalElements,
        data: response.content,
      };
    } catch (error) {
      return {
        totalPages: 0,
        totalElements: 0,
        error: 'Failed to fetch user interests',
      };
    }
  }

  async deleteUserInterests(
    deleteReq: DeleteUserInterestReq,
  ): Promise<{ data?: boolean; error?: string }> {
    await apiDeleteUserInterest(deleteReq);
    return { data: true };
  }

  async addUserInterests(
    req: AddUserInterestReq,
  ): Promise<{ data?: UserInterest; error?: string }> {
    const response = await apiAddUserInterest(req);
    return { data: response };
  }
}

export default UserInterestRepositoryImpl;
