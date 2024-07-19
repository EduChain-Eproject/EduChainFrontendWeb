import { UserCourseDTO } from '../../data/dto/UserCourseDTO';
import { AddUserCourseReq } from '../usecase/AddUserCourseUseCase';
import { GetUserCourseRequest } from '../usecase/GetUserCourseUseCase';

export interface UserCourseRepository {
  getUserCourse: (req: GetUserCourseRequest) => Promise<{
    totalPages: number;
    totalElements: number;
    data?: UserCourseDTO[];
    error?: string;
  }>;

  addUserCourse: (
    req: AddUserCourseReq,
  ) => Promise<{ data?: UserCourseDTO; error?: string }>;
}
