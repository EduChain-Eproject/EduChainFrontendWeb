import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import axiosService from '../../../../../../common/services/axiosService';
import { Order } from '../../model/Order';
import { OrderState } from '../orderAdminSlice';

export const apiFetchOrderByCourse: (courseId: number) => Promise<Order[]> 
    = async (courseId: number) => {
        return (await axiosService.get(`/api/order/course/${courseId}`)).data;
};

export const fetchOrderByCourse = createAsyncThunk('ui/blog/fetchOrderByCourse', async (courseId: number) => {
    const response = apiFetchOrderByCourse(courseId);
    return response;
});


export const fetchOrdersByCourseExtraReducers = (builder: ActionReducerMapBuilder<OrderState>) => {
    builder
        .addCase(fetchOrderByCourse.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchOrderByCourse.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.orders.data = action.payload;
        })
        .addCase(fetchOrderByCourse.rejected, (state, action) => {
            state.status = 'failed';
            state.orders.error = action.error.message;
        });
};
