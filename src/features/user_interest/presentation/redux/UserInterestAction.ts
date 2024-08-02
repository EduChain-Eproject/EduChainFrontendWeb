import { UserInterestRepository } from './../../domain/repository/UserInterestRepository';
import { createAsyncThunk } from '@reduxjs/toolkit';
import UserInterestRepositoryImpl from '../../data/repositoryImpl/UserInterestRepositoryImpl';

import GetUserInterestsUseCase, {
  GetUserInterestReq,
} from '../../domain/usecase/GetUserInterests UserCase';
import DeleteUserInterestUseCase, {
  DeleteUserInterestReq,
} from '../../domain/usecase/DeleteUserInterestUseCase';
import AddUserInterestUseCase, {
  AddUserInterestReq,
} from '../../domain/usecase/AddUserInterestUseCase';

const userInterestRepository: UserInterestRepository =
  new UserInterestRepositoryImpl();

export const fetchDeleteUserInterest = createAsyncThunk(
  'userInterests/deleteUserInterest',
  async (deleteUserInterest: DeleteUserInterestReq) => {
    const deleteInterestUseCase = new DeleteUserInterestUseCase(
      userInterestRepository,
    );
    return await deleteInterestUseCase.execute(deleteUserInterest);
  },
);

export const fetchUserInterests = createAsyncThunk(
  'userInterests/fetchUserInterests',
  async (req: GetUserInterestReq, { getState }) => {
    const getUserInterestsUseCase = new GetUserInterestsUseCase(
      userInterestRepository,
    );
    const response = await getUserInterestsUseCase.execute(req);
    return response;
  },
);

export const fetchAddUserInterest = createAsyncThunk(
  'userInterests/addUserInterests',
  async (req: AddUserInterestReq, { getState }) => {
    const getUserInterestsUseCase = new AddUserInterestUseCase(
      userInterestRepository,
    );
    const response = await getUserInterestsUseCase.execute(req);
    return response;
  },
);
