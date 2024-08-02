import { UserInterestRepository } from '../repository/UserInterestRepository';

export default class AddUserInterestUseCase {
  constructor(private userInterestRepository: UserInterestRepository) {}

  async execute(req: AddUserInterestReq) {
    return await this.userInterestRepository.addUserInterests(req);
  }
}
export type AddUserInterestReq = {
  student_id: number;
  course_id: number;
};
