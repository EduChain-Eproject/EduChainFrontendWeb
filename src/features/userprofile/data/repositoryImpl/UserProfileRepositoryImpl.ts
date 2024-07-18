import { UserProfileDto } from './../Dto/UserProfileDto';
import Failure from '../../../../common/entities/Failure';
import { ApiResponse } from '../../../auth/domain/usecases/Login';
import { UserProfileRepository } from '../../domain/repository/UserRepository';
import {
  getUserProfile,
  updateUserProfile,
} from '../dataSource/ProfileRemoteDataSource';
import { UpdateUserProfileReq } from '../../domain/usecases/UpdateUserProfileUseCase';

class UserProfileRepositoryImpl implements UserProfileRepository {
  async onGetUserProfile(
    email: string,
  ): Promise<{ data?: UserProfileDto | undefined; error?: string }> {
    try {
      const response = await getUserProfile(email);
      return { data: response };
    } catch (error) {
      if (error instanceof Failure) {
        return { error: error.message };
      }
      return { error: 'Unexpected error occurred' };
    }
  }

  async onUpdateUserProfile(
    req: UpdateUserProfileReq,
  ): Promise<{ data?: any; error?: string | undefined }> {
    try {
      const response = await updateUserProfile(req);
      return { data: response };
    } catch (error) {
      if (error instanceof Failure) {
        return { error: error.message };
      }
      return { error: 'Unexpected error occurred' };
    }
  }
}

export default UserProfileRepositoryImpl;
