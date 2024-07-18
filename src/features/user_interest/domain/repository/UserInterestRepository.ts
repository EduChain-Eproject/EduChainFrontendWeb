import { DeleteUserInterest } from './../entities/DeleteUserInterest';
import { UserInterest } from '../entities/UserInterest';
import { DeleteUserInterestRes } from '../usecase/DeleteUserInterestUseCase';

export interface UserInterestRepository {
  getUserInterests: () => Promise<{ data?: UserInterest[]; error?: string }>;

  deleteUserInterests: (
    deleteUserInterest: DeleteUserInterestRes,
  ) => Promise<{ data?: boolean; error?: string }>;
}
