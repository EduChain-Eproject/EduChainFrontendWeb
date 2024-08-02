import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import axiosService from '../../../../../../common/services/axiosService';
import { Order } from '../../model/Order';
import { OrderState } from '../orderAdminSlice';

export const apiFetchOrder: (orderId: number) => Promise<Order> 
    = async (orderId: number) => {
        return (await axiosService.get(`/api/order/${orderId}`)).data;
};

export const fetchOrder = createAsyncThunk('ui/blog/fetchOrder', async (orderId: number) => {
    const response = apiFetchOrder(orderId);
    return response;
});


export const fetchOrderExtraReducers = (builder: ActionReducerMapBuilder<OrderState>) => {
    builder
        .addCase(fetchOrder.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchOrder.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.orderDetail.data = action.payload;
        })
        .addCase(fetchOrder.rejected, (state, action) => {
            state.status = 'failed';
            state.orderDetail.error = action.error.message;
        });
};
