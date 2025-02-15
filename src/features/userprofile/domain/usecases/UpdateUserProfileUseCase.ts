import { UserProfileRepository } from '../repository/UserRepository';

export default class UpdateUserProfileUseCase {
  constructor(private userProfileRepository: UserProfileRepository) {}

  async execute(req: FormData) {
    return await this.userProfileRepository.onUpdateUserProfile(req);
  }
}

export type UpdateUserProfileReq = {
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  avatarFile: File;
};
