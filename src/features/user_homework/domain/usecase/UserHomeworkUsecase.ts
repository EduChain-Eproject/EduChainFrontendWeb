import { UserHomeworkRepository } from '../repository/UserHomeworkRepository';

export default class GetUserhomeworkUsecase {
  constructor(private userHomeworkRepository: UserHomeworkRepository) {}

  async execute(req: UserHomeworkRequest) {
    return await this.userHomeworkRepository.getUserHomework(req);
  }
}

export type UserHomeworkRequest = {
  isSubmitted: boolean | null;
  page: number;
  size: number;
};
