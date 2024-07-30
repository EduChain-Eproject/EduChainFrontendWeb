import { createSlice } from '@reduxjs/toolkit';
import { CommonState, initCommonState } from '../../../../common/state';
// import GetUserInterestHandling from './action-handling/GetUserInterestHandling';
import { UserInterest } from '../../domain/entities/UserInterest';
import { handleGetUserInterests } from './action-handling/HandleGetUserInterests';
import { handleDeleteInterests } from './action-handling/HandleDeleteUserInterest';

export interface UserInterestState {
  userInterests: CommonState<UserInterest[]>;
  pagination: {
    totalPages: number;
    totalElements: number;
    currentPage: number;
  };
  deleteStatus: CommonState<null>;
}
const initialState: UserInterestState = {
  userInterests: {
    data: undefined,
    status: null,
    error: undefined,
    errors: undefined,
  },
  pagination: {
    totalPages: 0,
    totalElements: 0,
    currentPage: 0,
  },
  deleteStatus: {
    data: null,
    status: null,
    error: undefined,
    errors: undefined,
  },
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
