import { UserHomeworkRepository } from '../repository/UserHomeworkRepository';

export default class GetUserhomeworkUsecase {
  constructor(private userHomeworkRepository: UserHomeworkRepository) {}

  async execute(req: UserHomeworkRequest) {
    return await this.userHomeworkRepository.getUserHomework(req);
  }
}

export type UserHomeworkRequest = {
  userId: number;
  isSubmitted: boolean | null; // null to allow for no filtering
  page: number;
  size: number;
};
