import { UserProfileRepository } from '../repository/UserRepository';

export default class UpdateUserProfileUseCase {
  constructor(private userProfileRepository: UserProfileRepository) {}

  async execute(req: any) {
    return await this.userProfileRepository.onUpdateUserProfile(req);
  }
}

export type UpdateUserProfileReq = {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  avatarFile: File;
  avatarPath: string;
};
