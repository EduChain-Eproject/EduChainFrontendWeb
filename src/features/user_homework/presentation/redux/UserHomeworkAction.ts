import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserHomeworkRepositoryImpl } from './../../data/repositoryImpl/UserHomeworkrepositoryImp';
import { UserHomeworkRepository } from './../../domain/repository/UserHomeworkRepository';
import GetUserhomeworkUsecase, {
  UserHomeworkRequest,
} from '../../domain/usecase/UserHomeworkUsecase';
const userHomeworkRepository: UserHomeworkRepository =
  new UserHomeworkRepositoryImpl();

export const fetchUserHomework = createAsyncThunk(
  'userHomework/fetchUserHomework',
  async (req: UserHomeworkRequest, { getState }) => {
    const getUserHomeworkListUseCase = new GetUserhomeworkUsecase(
      userHomeworkRepository,
    );
    const response = await getUserHomeworkListUseCase.execute(req);
    console.log(response);
    return response;
  },
);
