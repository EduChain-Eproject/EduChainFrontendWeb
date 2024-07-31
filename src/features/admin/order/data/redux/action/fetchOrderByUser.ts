import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import axiosService from '../../../../../../common/services/axiosService';
import { Order } from '../../model/Order';
import { OrderState } from '../orderAdminSlice';

export const apiFetchOrderByUser: (userId: number) => Promise<Order[]> 
    = async (userId: number) => {
        return (await axiosService.get(`/api/order/user/${userId}`)).data;
};

export const fetchOrderByUser = createAsyncThunk('ui/blog/fetchOrderByUser', async (userId: number) => {
    const response = apiFetchOrderByUser(userId);
    return response;
});


export const fetchOrderByUserExtraReducers = (builder: ActionReducerMapBuilder<OrderState>) => {
    builder
        .addCase(fetchOrderByUser.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchOrderByUser.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.orders.data = action.payload;
        })
        .addCase(fetchOrderByUser.rejected, (state, action) => {
            state.status = 'failed';
            state.orders.error = action.error.message;
        });
};
