import { UserInterestRepository } from '../repository/UserInterestRepository';

export default class DeleteUserInterestUseCase {
  constructor(private userInterestRepository: UserInterestRepository) {}

  async execute(req: DeleteUserInterestRes) {
    return await this.userInterestRepository.deleteUserInterests(req);
  }
}
export type DeleteUserInterestRes = {
  course_id: number;
  student_id: number;
};
