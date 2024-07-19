import { UserProfileDto } from '../dto/UserProfileDto';
import Failure from '../../../../common/entities/Failure';
import { ApiResponse } from '../../../auth/domain/usecases/Login';
import { UserProfileRepository } from '../../domain/repository/UserRepository';
import {
  getUserProfile,
  updateUserProfile,
} from '../dataSource/ProfileRemoteDataSource';
import { UpdateUserProfileReq } from '../../domain/usecases/UpdateUserProfileUseCase';
import { UserProfileModel } from '../../domain/entities/UserProfileModel';

class UserProfileRepositoryImpl implements UserProfileRepository {
  async onGetUserProfile(
    email: string,
  ): Promise<{ data?: UserProfileModel | undefined; error?: string }> {
    try {
      const response = await getUserProfile(email);
      const userProfile = this.mapDtoToModel(response);

      return { data: userProfile };
    } catch (error) {
      if (error instanceof Failure) {
        return { error: error.message };
      }
      console.log(error);
      return { error: 'Unexpected error occurred Get Profile' };
    }
  }
  async onUpdateUserProfile(
    formData: FormData,
  ): Promise<{ data?: UserProfileModel; error?: string | undefined }> {
    try {
      const response = await updateUserProfile(formData);
      const userProfile = this.mapDtoToModel(response.content);
      return { data: userProfile };
    } catch (error) {
      if (error instanceof Failure) {
        return { error: error.message };
      }
      return { error: 'Unexpected error occurred update profile' };
    }
  }

  private mapDtoToModel(dto: UserProfileDto): UserProfileModel {
    return new UserProfileModel(
      dto.id,
      dto.email,
      dto.firstName,
      dto.lastName,
      dto.phone,
      dto.address,
      dto.avatarPath,
      dto.role,
    );
  }
}

export default UserProfileRepositoryImpl;
