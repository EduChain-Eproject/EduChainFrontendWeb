import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import axiosService from '../../../../../../common/services/axiosService';
import { Order } from '../../model/Order';
import { OrderState } from '../orderAdminSlice';
import Failure from '../../../../../../common/entities/Failure';

export type GetOrderCourseReq = {
  titleSearch: string;
  page: number;
  size: number;
  courseId: number;
};
export const apiFetchOrderByCourse = async (
  req: GetOrderCourseReq,
): Promise<{
  totalPages: number;
  totalElements: number;
  content: Order[];
  error?: {
    message: string;
    errors: { [key: string]: string };
    timestamp?: string;
  };
}> => {
  try {
    const response = await axiosService.post(
      `http://localhost:8080/api/order/course`,
      req,
    );
    console.log(response.data);
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

export const fetchOrderByCourse = createAsyncThunk(
  'ui/blog/fetchOrderByCourse',
  async (req: GetOrderCourseReq) => {
    const response = apiFetchOrderByCourse(req);
    return response;
  },
);

export const fetchOrdersByCourseExtraReducers = (
  builder: ActionReducerMapBuilder<OrderState>,
) => {
  builder
    .addCase(fetchOrderByCourse.pending, (state) => {
      state.orders.status = 'loading';
    })
    .addCase(fetchOrderByCourse.fulfilled, (state, action) => {
      state.orders.status = 'succeeded';
      state.orders.data = action.payload.content;
      console.log(action.payload.content);
    })
    .addCase(fetchOrderByCourse.rejected, (state, action) => {
      state.orders.status = 'failed';
      state.orders.error = action.error.message;
    });
};
