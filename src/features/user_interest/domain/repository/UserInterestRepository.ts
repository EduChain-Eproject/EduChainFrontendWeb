import UserInterest from '../../../../common/entities/UserInterest';
import { AddUserInterestReq } from '../usecase/AddUserInterestUseCase';
import { DeleteUserInterestReq } from '../usecase/DeleteUserInterestUseCase';
import { GetUserInterestReq } from '../usecase/GetUserInterests UserCase';

export interface UserInterestRepository {
  getUserInterests: (userInterest: GetUserInterestReq) => Promise<{
    totalPages: number;
    totalElements: number;
    data?: UserInterest[];
    error?: string;
  }>;

  deleteUserInterests: (
    deleteUserInterest: DeleteUserInterestReq,
  ) => Promise<{ data?: boolean; error?: string }>;

  addUserInterests: (
    req: AddUserInterestReq,
  ) => Promise<{ data?: UserInterest; error?: string }>;
}
