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
    error?: {
      message: string;
      errors: { [key: string]: string };
      timestamp?: string;
    };
  }>;

  deleteUserInterests: (deleteUserInterest: DeleteUserInterestRes) => Promise<{
    data?: boolean;
    error?: {
      message: string;
      errors: { [key: string]: string };
      timestamp?: string;
    };
  }>;

  addUserInterests: (req: AddUserInterestReq) => Promise<{
    data?: UserInterest;
    error?: {
      message: string;
      errors: { [key: string]: string };
      timestamp?: string;
    };
  }>;
}
