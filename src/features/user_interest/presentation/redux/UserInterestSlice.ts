import { createSlice } from '@reduxjs/toolkit';
import { CommonState, initCommonState } from '../../../../common/state';
// import GetUserInterestHandling from './action-handling/GetUserInterestHandling';
import { handleGetUserInterests } from './action-handling/HandleGetUserInterests';
import { handleDeleteInterests } from './action-handling/HandleDeleteUserInterest';
import UserInterest from '../../../../common/entities/UserInterest';

export interface UserInterestState {
  userInterests: CommonState<UserInterest[]>;
  userInterest: CommonState<UserInterest> | null;
  pagination: {
    totalPages: number;
    totalElements: number;
    currentPage: number;
  };
  deleteStatus: CommonState<null>;
}
const initialState: UserInterestState = {
  userInterests: initCommonState,
  pagination: {
    totalPages: 0,
    totalElements: 0,
    currentPage: 0,
  },
  deleteStatus: initCommonState,
  userInterest: initCommonState,
};

const userInterestSlice = createSlice({
  name: 'user_interest',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    handleGetUserInterests(builder);
    handleDeleteInterests(builder);
  },
});

export const { setPage } = userInterestSlice.actions;

export default userInterestSlice.reducer;
