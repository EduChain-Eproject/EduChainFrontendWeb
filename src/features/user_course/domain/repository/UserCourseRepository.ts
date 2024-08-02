import UserCourse from '../../../../common/entities/UserCourse';
import { AddUserCourseReq } from '../usecase/AddUserCourseUseCase';
import { GetUserCourseRequest } from '../usecase/GetUserCourseUseCase';

export interface UserCourseRepository {
  getUserCourse: (req: GetUserCourseRequest) => Promise<{
    totalPages: number;
    totalElements: number;
    data?: UserCourse[];
    error?: string;
  }>;

  addUserCourse: (
    req: AddUserCourseReq,
  ) => Promise<{ data?: UserCourse; error?: string }>;
}
