import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import axiosService from '../../../../../../common/services/axiosService';
import { Order } from '../../model/Order';
import { OrderState } from '../orderAdminSlice';
import Failure from '../../../../../../common/entities/Failure';

export type GetOrderUserReq = {
  titleSearch: string;
  page: number;
  size: number;
  userId: number;
};

export const apiFetchOrderByUser = async (
  req: GetOrderUserReq,
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
      `http://localhost:8080/api/order/user`,
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

export const fetchOrderByUser = createAsyncThunk(
  'ui/blog/fetchOrderByUser',
  async (req: GetOrderUserReq) => {
    const response = apiFetchOrderByUser(req);
    return response;
  },
);

export const fetchOrderByUserExtraReducers = (
  builder: ActionReducerMapBuilder<OrderState>,
) => {
  builder
    .addCase(fetchOrderByUser.pending, (state) => {
      state.orders.status = 'loading';
    })
    .addCase(fetchOrderByUser.fulfilled, (state, action) => {
      state.orders.status = 'succeeded';
      state.orders.data = action.payload.content;
      state.pagination.totalElements = action.payload.totalElements;
      state.pagination.totalPages = action.payload.totalPages;
    })
    .addCase(fetchOrderByUser.rejected, (state, action) => {
      state.orders.status = 'failed';
      state.orders.error = action.error.message;
    });
};
