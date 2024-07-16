import { UserInterestRepository } from '../repository/UserInterestRepository';

export default class GetUserInterestsUseCase {
  constructor(private userInterestRepository: UserInterestRepository) {}

  async execute(req: GetUserInterestReq) {
    return await this.userInterestRepository.getUserInterests(req);
  }
}
export type GetUserInterestReq = {
  student_id: number;
  course_id: number;
  page: number;
  size: number;
};
