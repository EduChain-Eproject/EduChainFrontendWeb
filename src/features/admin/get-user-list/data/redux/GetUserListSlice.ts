import { createSlice } from '@reduxjs/toolkit';
import { CommonState, initCommonState } from '../../../../../common/state';
import { UserDto } from '../../../../auth/data/dtos/UserDto';
import HandleGetUserList from '../service/HandleGetUserList';
import User from '../../../../../common/entities/User';
import HandleBlockOrUnBlock from '../service/HandleBlockOrUnBlock';

export interface GetUserListState {
  GetUserListState: CommonState<User[]>;
  pagination: {
    totalPages: number;
    totalElements: number;
    currentPage: number;
  };
  blockResultState: CommonState<boolean>;
}

const initialState: GetUserListState = {
  GetUserListState: initCommonState,
  pagination: {
    totalPages: 0,
    totalElements: 0,
    currentPage: 0,
  },
  blockResultState: initCommonState,
};

const GetUserListSlice = createSlice({
  name: 'chapters',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    HandleGetUserList(builder);
    HandleBlockOrUnBlock(builder);
  },
});
export const { setPage } = GetUserListSlice.actions;
export default GetUserListSlice.reducer;
