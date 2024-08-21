import Failure from '../../../../common/entities/Failure';
import { UserProfileRepository } from '../../domain/repository/UserRepository';
import {
  getUserProfile,
  updateUserProfile,
} from '../dataSource/ProfileRemoteDataSource';
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

      return { data: response };
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

      return response;
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
}

export default UserProfileRepositoryImpl;
