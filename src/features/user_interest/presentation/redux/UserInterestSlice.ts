import { createSlice } from '@reduxjs/toolkit';
import { CommonState, initCommonState } from '../../../../common/state';
// import GetUserInterestHandling from './action-handling/GetUserInterestHandling';
import { UserInterest } from '../../domain/entities/UserInterest';
import { handleGetUserInterests } from './action-handling/HandleGetUserInterests';

export interface UserInterestState {
  userInterests: CommonState<UserInterest[]>;
}

const initialState: UserInterestState = {
  userInterests: { data: undefined, status: null, error: undefined },
};

const userInterestSlice = createSlice({
  name: 'user_interest',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GetUserInterestHandling(builder);
    handleGetUserInterests(builder);
  },
});

export default userInterestSlice.reducer;
