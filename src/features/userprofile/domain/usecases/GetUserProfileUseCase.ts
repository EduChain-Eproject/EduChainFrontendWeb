import { UserProfileRepository } from '../repository/UserRepository';

export default class GetUserProfileUseCase {
  constructor(private userProfileRepository: UserProfileRepository) {}

  async execute(email: string) {
    return await this.userProfileRepository.onGetUserProfile(email);
  }
}

export type UserProfileRes = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  avatarPath: string;
};
