import { UserProfileModel } from '../entities/UserProfileModel';

export interface UserProfileRepository {
  onGetUserProfile(
    email: string,
  ): Promise<{ data?: UserProfileModel; error?: string }>;

  onUpdateUserProfile: (
    req: FormData,
  ) => Promise<{ data?: UserProfileModel; error?: string }>;
}
