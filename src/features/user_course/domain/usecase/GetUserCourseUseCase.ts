import { UserCourseRepository } from '../repository/UserCourseRepository';

export default class GetUserCourseUseCase {
  constructor(private userCourseRepository: UserCourseRepository) {}
  async excute(req: GetUserCourseRequest) {
    return await this.userCourseRepository.getUserCourse(req);
  }
}

export type GetUserCourseRequest = {
  studentId: number;
  page: number;
  size: number;
  titleSearch: string;
  completionStatus: string | null;
};

export type AddUserCourseReq = {
  student_id: number;
  course_id: number;
};
