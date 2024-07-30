import { UserHomework } from '../../../../common/entities/UserHomework';
import { createSlice } from '@reduxjs/toolkit';
import { CommonState } from '../../../../common/state';
import { handleGetUserHomework } from './action-handling/GetUserHomeworkHandling';

export interface UserHomeworkState {
  userHomeworks: CommonState<UserHomework[]>;
  pagination: {
    totalPages: number;
    totalElements: number;
    currentPage: number;
  };
}

const initialState: UserHomeworkState = {
  userHomeworks: {
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
};

const userHomeworkSlice = createSlice({
  name: 'user_homework',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    handleGetUserHomework(builder);
  },
});

export const { setPage } = userHomeworkSlice.actions;

export default userHomeworkSlice.reducer;
