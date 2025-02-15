import { createSlice, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { CommonState, initCommonState } from '../../../../../common/state';
import { Order } from '../model/Order';
import { fetchOrdersByCourseExtraReducers } from './action/fetchOrderByCourse';
import { fetchAllOrderExtraReducers } from './action/fetchAllOrder';
import { fetchOrderByUserExtraReducers } from './action/fetchOrderByUser';
import { fetchOrderExtraReducers } from './action/fetchOrder';

export interface OrderState {
  orders: CommonState<Order[]>;
  orderDetail: CommonState<Order>;
  status: string | null;
  error: string | undefined;
  pagination: {
    totalPages: number;
    totalElements: number;
    currentPage: number;
  };
  ordersList: CommonState<Order[]>;
}

const initialState: OrderState = {
  orders: { ...initCommonState },
  orderDetail: { ...initCommonState },
  status: null,
  error: undefined,
  pagination: {
    totalPages: 0,
    totalElements: 0,
    currentPage: 0,
  },
  ordersList: { ...initCommonState },
};

const OrderAdminSlice = createSlice({
  name: 'orderAdmin',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<OrderState>) => {
    fetchOrdersByCourseExtraReducers(builder);
    fetchAllOrderExtraReducers(builder);
    fetchOrderByUserExtraReducers(builder);
    fetchOrderExtraReducers(builder);
  },
});
export const { setPage } = OrderAdminSlice.actions;
export default OrderAdminSlice.reducer;
