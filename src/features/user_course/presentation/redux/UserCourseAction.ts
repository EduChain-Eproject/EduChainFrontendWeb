import { UserCourseRepository } from '../../domain/repository/UserCourseRepository';
import { UserCourseRepositoryImpl } from './../../data/repositoryImpl/UserCourseRepositoryImpl';

import GetUserCourseUseCase, {
  GetUserCourseRequest,
} from '../../domain/usecase/GetUserCourseUseCase';
import { createAsyncThunk } from '@reduxjs/toolkit';
import AddUserCourseUseCase, {
  AddUserCourseReq,
} from '../../domain/usecase/AddUserCourseUseCase';

const userCourseRepository: UserCourseRepository =
  new UserCourseRepositoryImpl();

export const fetchAddUserCourse = createAsyncThunk(
  'userInterests/deleteUserInterest',
  async (req: AddUserCourseReq) => {
    const addUseCourseUseCase = new AddUserCourseUseCase(userCourseRepository);
    return await addUseCourseUseCase.excute(req);
  },
);

export const fetchUserCourse = createAsyncThunk(
  'userCourse/fetchUserCourse',
  async (req: GetUserCourseRequest, { getState }) => {
    const getUserInterestsUseCase = new GetUserCourseUseCase(
      userCourseRepository,
    );
    const response = await getUserInterestsUseCase.excute(req);
    return response;
  },
);
