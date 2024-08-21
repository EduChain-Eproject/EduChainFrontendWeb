import { UserProfileModel } from '../entities/UserProfileModel';

export interface UserProfileRepository {
  onGetUserProfile(email: string): Promise<{
    data?: UserProfileModel;
    error?: {
      message: string;
      errors: { [key: string]: string };
      timestamp?: string;
    };
  }>;

  onUpdateUserProfile: (req: FormData) => Promise<{
    data?: UserProfileModel;
    error?: {
      message: string;
      errors: { [key: string]: string };
      timestamp?: string;
    };
  }>;
}
