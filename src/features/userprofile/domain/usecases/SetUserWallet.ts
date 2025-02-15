import { UserProfileRepository } from '../repository/UserRepository';

export default class SetUserWallet {
  constructor(private userProfileRepository: UserProfileRepository) { }

  async execute(req: {
    walletAddress: string;
  }) {
    return await this.userProfileRepository.onSetUserWallet(req);
  }
}

