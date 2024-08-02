import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import axiosService from '../../../../../../common/services/axiosService';
import { Order } from '../../model/Order';
import { OrderState } from '../orderAdminSlice';

export const apiFetchOrders: () => Promise<Order[]>
    = async () => {
        return (await axiosService.get('/api/order')).data;
    };

export const fetchAllOrder = createAsyncThunk(
    '/ui/blog/fetchOrders',
    async () => {
        const response = await apiFetchOrders();
        return response;
    }
);

export const fetchAllOrderExtraReducers = (builder: ActionReducerMapBuilder<OrderState>) => {
    builder
        .addCase(fetchAllOrder.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchAllOrder.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.orders.data = action.payload;
        })
        .addCase(fetchAllOrder.rejected, (state, action) => {
            state.status = 'failed';
            state.orders.error = action.error.message;
        });
};
