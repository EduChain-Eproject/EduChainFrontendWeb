import { UserInterestRepository } from '../repository/UserInterestRepository';

export default class DeleteUserInterestUseCase {
  constructor(private userInterestRepository: UserInterestRepository) {}

  async execute(req: DeleteUserInterestReq) {
    return await this.userInterestRepository.deleteUserInterests(req);
  }
}
export type DeleteUserInterestReq = {
  course_id: number;
  student_id: number;
};
