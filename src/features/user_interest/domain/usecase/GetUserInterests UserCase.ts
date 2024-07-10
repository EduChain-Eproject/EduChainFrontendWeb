import { UserInterestRepository } from '../repository/UserInterestRepository';

export default class GetUserInterestsUseCase {
  constructor(private userInterestRepository: UserInterestRepository) {}

  async execute() {
    return await this.userInterestRepository.getUserInterests();
  }
}
export const GetUserIterestRes = {};
