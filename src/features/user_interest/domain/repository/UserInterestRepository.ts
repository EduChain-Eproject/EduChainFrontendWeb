import { UserInterestDto } from './../../data/dto/UserInterestDto';
import { UserInterest } from '../entities/UserInterest';
import { AddUserInterestReq } from '../usecase/AddUserInterestUseCase';
import { DeleteUserInterestRes } from '../usecase/DeleteUserInterestUseCase';
import { GetUserInterestReq } from '../usecase/GetUserInterests UserCase';

export interface UserInterestRepository {
  getUserInterests: (userInterest: GetUserInterestReq) => Promise<{
    totalPages: number;
    totalElements: number;
    data?: UserInterest[];
    error?: string;
  }>;

  deleteUserInterests: (
    deleteUserInterest: DeleteUserInterestRes,
  ) => Promise<{ data?: boolean; error?: string }>;

  addUserInterests: (
    req: AddUserInterestReq,
  ) => Promise<{ data?: UserInterest; error?: string }>;
}
