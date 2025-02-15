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

  onSetUserWallet: (req: {
    walletAddress: string;
  }) => Promise<{
    data?: {
      walletAddress: string;
    };
    error?: {
      message: string;
      errors: { [key: string]: string };
      timestamp?: string;
    };
  }>;
}
