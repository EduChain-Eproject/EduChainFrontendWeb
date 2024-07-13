import { ApiResponse } from '../../../auth/domain/usecases/Login';
import { UserProfileModel } from '../entities/UserProfileModel';
import { UpdateUserProfileReq } from '../usecases/UpdateUserProfileUseCase';

export interface UserProfileRepository {
  onGetUserProfile: (
    email: string,
  ) => Promise<{ data?: UserProfileModel; error?: string }>;

  onUpdateUserProfile: (
    req: any,
  ) => Promise<{ data?: UserProfileModel; error?: string }>;
}
