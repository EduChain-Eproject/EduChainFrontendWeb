import { createSlice, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { CommonState, initCommonState } from '../../../../../common/state';
import { Order } from '../model/Order';
import { fetchOrdersByCourseExtraReducers } from './action/fetchOrderByCourse';
import { fetchAllOrderExtraReducers } from './action/fetchAllOrder';
import { fetchOrderByUserExtraReducers } from './action/fetchOrderByUser';
import { fetchOrderExtraReducers } from './action/fetchOrder';

export interface OrderState {
    orders: CommonState<Order[]>,
    orderDetail: CommonState<Order>,
    status: string | null,
    error: string | undefined;
}

const initialState: OrderState = {
    orders: { ...initCommonState },
    orderDetail: { ...initCommonState },
    status: null,
    error: undefined,
}

const blogUISlice = createSlice({
    name: 'orderAdmin',
    initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<OrderState>) => {
        fetchOrdersByCourseExtraReducers(builder);
        fetchAllOrderExtraReducers(builder);
        fetchOrderByUserExtraReducers(builder);
        fetchOrderExtraReducers(builder);
    },
});

export default blogUISlice.reducer;
