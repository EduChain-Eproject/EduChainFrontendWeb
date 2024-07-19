import { UserCourseRepository } from '../repository/UserCourseRepository';

export default class AddUserCourseUseCase {
  constructor(private userCourseRepository: UserCourseRepository) {}
  async excute(req: AddUserCourseReq) {
    return await this.userCourseRepository.addUserCourse(req);
  }
}

export type AddUserCourseReq = {
  student_id: number;
  course_id: number;
};
