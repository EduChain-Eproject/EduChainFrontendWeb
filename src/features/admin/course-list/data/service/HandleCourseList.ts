import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import Course from '../../../../../common/entities/Course';
import Failure from '../../../../../common/entities/Failure';
import axiosService from '../../../../../common/services/axiosService';
import { GetCourseListState } from '../redux/GetCourseListSlice';

export type GetCourseListReq = {
  titleSearch: string;
  page: number;
  size: number;
};
const baseUrl = 'http://localhost:8080/';
export const apiGetUserList = async (
  req: GetCourseListReq,
): Promise<{
  totalPages: number;
  totalElements: number;
  content: Course[];
  error?: {
    message: string;
    errors: { [key: string]: string };
    timestamp?: string;
  };
}> => {
  try {
    const response = await axiosService.post(
      `${baseUrl}ADMIN/course-list`,
      req,
    );
    console.log(response);
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

export const GetCourseListAction = createAsyncThunk(
  'admin/GetCourseListAction',
  async (req: GetCourseListReq) => {
    return await apiGetUserList(req);
  },
);

const HandleGetCourseList = (
  builder: ActionReducerMapBuilder<GetCourseListState>,
) => {
  builder
    .addCase(GetCourseListAction.pending, (state) => {
      state.GetcourseListState.status = 'loading';
    })
    .addCase(GetCourseListAction.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.GetcourseListState.status = 'failed';
        state.GetcourseListState.error = action.payload.error?.message;
        state.GetcourseListState.errors = action.payload.error?.errors;
      } else {
        state.GetcourseListState.status = 'succeeded';
        if (state.GetcourseListState.data !== null) {
          state.GetcourseListState.data = action.payload.content;
          console.log(state.pagination.totalElements);
          state.pagination.totalPages = action.payload.totalPages;
          state.pagination.totalElements = action.payload.totalElements;
        }
      }
    })
    .addCase(GetCourseListAction.rejected, (state, action) => {
      state.GetcourseListState.status = 'failed';
      state.GetcourseListState.error = action.error.message;
    });
};
export default HandleGetCourseList;
