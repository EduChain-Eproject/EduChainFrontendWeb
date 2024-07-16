import { DeleteUserInterest } from './../entities/DeleteUserInterest';
import { UserInterest } from '../entities/UserInterest';
import { DeleteUserInterestRes } from '../usecase/DeleteUserInterestUseCase';
import { GetUserInterestReq } from '../usecase/GetUserInterests UserCase';

export interface UserInterestRepository {
  getUserInterests: (
    userInterest: GetUserInterestReq,
  ) => Promise<{ data?: UserInterest[]; error?: string }>;

  deleteUserInterests: (
    deleteUserInterest: DeleteUserInterestRes,
  ) => Promise<{ data?: boolean; error?: string }>;
}
