import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import UserProfileRepositoryImpl from '../../data/repositoryImpl/UserProfileRepositoryImpl';
import { UserProfileRepository } from './../../domain/repository/UserRepository';
import GetUserProfileUseCase from '../../domain/usecases/GetUserProfileUseCase';
import UpdateUserProfileUseCase, {
  UpdateUserProfileReq,
} from '../../domain/usecases/UpdateUserProfileUseCase';

const userProfileRepository: UserProfileRepository =
  new UserProfileRepositoryImpl();

export const getUserProfileAction = createAsyncThunk(
  'user_profile',
  async (email: string) => {
    const userProfile = new GetUserProfileUseCase(userProfileRepository);
    return await userProfile.execute(email);
  },
);

export const updateUserProfileAction = createAsyncThunk(
  'update_profile',
  async (formData: FormData) => {
    const updateProfile = new UpdateUserProfileUseCase(userProfileRepository);
    return await updateProfile.execute(formData);
  },
);
export const resetUpdateProfileStatus = createAction(
  'userProfile/resetUpdateProfileStatus',
);
