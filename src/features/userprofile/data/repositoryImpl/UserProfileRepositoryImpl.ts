import { UserProfileDto } from '../dto/UserProfileDto';
import Failure from '../../../../common/entities/Failure';
import { UserProfileRepository } from '../../domain/repository/UserRepository';
import {
  getUserProfile,
  updateUserProfile,
} from '../dataSource/ProfileRemoteDataSource';
import { UpdateUserProfileReq } from '../../domain/usecases/UpdateUserProfileUseCase';
import { UserProfileModel } from '../../domain/entities/UserProfileModel';

class UserProfileRepositoryImpl implements UserProfileRepository {
  async onGetUserProfile(email: string): Promise<{
    data?: UserProfileModel | undefined;
    error?: {
      message: string;
      errors: { [key: string]: string };
      timestamp?: string;
    };
  }> {
    try {
      const response = await getUserProfile(email);
      const userProfile = this.mapDtoToModel(response);

      return { data: userProfile };
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
  async onUpdateUserProfile(formData: FormData): Promise<{
    data?: UserProfileModel;
    error?: {
      message: string;
      errors: { [key: string]: string };
      timestamp?: string;
    };
  }> {
    try {
      const response = await updateUserProfile(formData);
      console.log(response.data);
      const userProfile = this.mapDtoToModel(response.data);
      return { data: userProfile };
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
          message: 'Unexpected error occurred on update',
          errors: { message: 'Unexpected error occurred' },
        },
      };
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
