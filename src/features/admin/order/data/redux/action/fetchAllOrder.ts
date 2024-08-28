import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import axiosService from '../../../../../../common/services/axiosService';
import { Order } from '../../model/Order';
import { OrderState } from '../orderAdminSlice';

export type FetchAllOrderReq = {
  page: number;
  size: number;
};

export const apiFetchOrders = async (
  req: FetchAllOrderReq,
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
  return (await axiosService.post('http://localhost:8080/api/order', req)).data;
};

export const fetchAllOrder = createAsyncThunk(
  '/ui/blog/fetchOrders',
  async (req: FetchAllOrderReq) => {
    const response = await apiFetchOrders(req);
    console.log(response);
    return response;
  },
);

export const fetchAllOrderExtraReducers = (
  builder: ActionReducerMapBuilder<OrderState>,
) => {
  builder
    .addCase(fetchAllOrder.pending, (state) => {
      state.ordersList.status = 'loading';
    })
    .addCase(fetchAllOrder.fulfilled, (state, action) => {
      state.ordersList.status = 'succeeded';
      state.ordersList.data = action.payload.content;
      state.pagination.totalPages = action.payload.totalPages;
      state.pagination.totalElements = action.payload.totalElements;
      console.log(action.payload.totalElements);
      console.log(action.payload.totalPages);
      console.log(action.payload.content);
    })
    .addCase(fetchAllOrder.rejected, (state, action) => {
      state.ordersList.status = 'failed';
      state.ordersList.error = action.error.message;
    });
};
