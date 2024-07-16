import { createAsyncThunk } from '@reduxjs/toolkit';
import UserInterestRepositoryImpl from '../../data/repositoryImpl/UserInterestRepositoryImpl';
import { UserInterestRepository } from '../../domain/repository/UserInterestRepository';
import GetUserInterestsUseCase, {
  GetUserInterestReq,
} from '../../domain/usecase/GetUserInterests UserCase';
import { DeleteUserInterest } from '../../domain/entities/DeleteUserInterest';
import DeleteUserInterestUseCase from '../../domain/usecase/DeleteUserInterestUseCase';

const userInterestRepository: UserInterestRepository =
  new UserInterestRepositoryImpl();

export const fetchUserInterests = createAsyncThunk(
  'userInterests/fetchUserInterests',
  async (req: GetUserInterestReq) => {
    const getUserInterestsUseCase = new GetUserInterestsUseCase(
      userInterestRepository,
    );
    return await getUserInterestsUseCase.execute(req);
  },
);

export const fetchDeleteUserInterest = createAsyncThunk(
  'userInterests/deleteUserInterest',
  async (deleteUserInterest: DeleteUserInterest) => {
    const deleteInterestUseCase = new DeleteUserInterestUseCase(
      userInterestRepository,
    );
    return await deleteInterestUseCase.execute(deleteUserInterest);
  },
);
