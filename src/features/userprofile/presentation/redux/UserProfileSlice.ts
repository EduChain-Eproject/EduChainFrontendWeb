import { createSlice } from '@reduxjs/toolkit';
import { UserProfileModel } from './../../domain/entities/UserProfileModel';
import GetUserProfileHandling from './action_handling/GetUserProfileHandling';
import { CommonState, initCommonState } from '../../../../common/state';
import updateUserProfileHandling from './action_handling/UpdateUserProfileHandling';
import setUserWalletHandling from './action_handling/SetUserWalletHandling';
export interface UserProfileState {
  profilePage: CommonState<UserProfileModel>;
  updateProfilePage: CommonState<UserProfileModel>;
}
const initialState: UserProfileState = {
  updateProfilePage: initCommonState,
  profilePage: initCommonState,
};

const userProfileSlice = createSlice({
  name: 'user_profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    GetUserProfileHandling(builder);
    updateUserProfileHandling(builder);
    setUserWalletHandling(builder);
  },
});

export default userProfileSlice.reducer;
