import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import ApiResponse from '../../../../../common/entities/ApiResponse';
import Failure from '../../../../../common/entities/Failure';
import axiosService from '../../../../../common/services/axiosService';
import { UserDto } from '../../../../auth/data/dtos/UserDto';
import { GetUserListState } from '../redux/GetUserListSlice';
import User from '../../../../../common/entities/User';

export type GetListUserReq = {
  emailSearch: string;
  page: number;
  size: number;
};
const baseUrl = 'http://localhost:8080/';
export const apiGetUserList = async (
  req: GetListUserReq,
): Promise<{
  totalPages: number;
  totalElements: number;
  content: User[];
  error?: {
    message: string;
    errors: { [key: string]: string };
    timestamp?: string;
  };
}> => {
  try {
    const response = await axiosService.post(`${baseUrl}ADMIN/user-list`, req);
    return response.data;
  } catch (error) {
    if (error.response) {
      const data = error.response.data;
      const message = data.errors.message || 'Validation error';
      const errors = data.errors;

      return {
        totalPages: 0,
        totalElements: 0,
        content: [],
        error: new Failure(message, errors, data.timestamp),
      };
    }
    return {
      totalPages: 0,
      totalElements: 0,
      content: [],
      error: new Failure('message', {}, ''),
    };
  }
};

export const GetUserListAction = createAsyncThunk(
  'admin/apiGetUserList',
  async (req: GetListUserReq) => {
    return await apiGetUserList(req);
  },
);

const HandleGetUserList = (
  builder: ActionReducerMapBuilder<GetUserListState>,
) => {
  builder
    .addCase(GetUserListAction.pending, (state) => {
      state.GetUserListState.status = 'loading';
    })
    .addCase(GetUserListAction.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.GetUserListState.status = 'failed';
        state.GetUserListState.error = action.payload.error?.message;
        state.GetUserListState.errors = action.payload.error?.errors;
      } else {
        state.GetUserListState.status = 'succeeded';
        if (state.GetUserListState.data !== null) {
          state.GetUserListState.data = action.payload.content;
          console.log(state.GetUserListState.data);
          state.pagination.totalPages = action.payload.totalPages;
          state.pagination.totalElements = action.payload.totalElements;
        }
      }
    })
    .addCase(GetUserListAction.rejected, (state, action) => {
      state.GetUserListState.status = 'failed';
      state.GetUserListState.error = action.error.message;
    });
};
export default HandleGetUserList;
