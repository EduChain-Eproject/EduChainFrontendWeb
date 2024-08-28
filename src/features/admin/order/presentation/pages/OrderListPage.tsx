import React, { useEffect, useState } from 'react';
import { RouteObject, useNavigate } from 'react-router-dom';
import OrderList from '../components/orderList';
import AppBreadcrumb from '../../../../../common/components/Breadcrumbs/AppBreadcrumb';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../common/context/store';
import Pagination from '../../../../../common/components/Pagination/Pagination';
import { setPage } from '../../data/redux/orderAdminSlice';
import { fetchAllOrder, FetchAllOrderReq } from '../../data/redux/action/fetchAllOrder';

export const route: () => RouteObject = () => {
  return {
    path: 'order',
    element: <OrderListPage />,
  };
};

const breadCrumbItems = [
  {
    label: 'Home',
    href: '/dashboard',
  },
  {
    label: 'Order list',
    href: '#',
  },
];

const OrderListPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data, status, error } = useAppSelector(
    (state) => state.orderSlice.ordersList,
  );

  const [size, setSize] = useState(5);
  const [sortBy, setSortBy] = useState('createdAt');

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };
  const { totalPages, currentPage } = useAppSelector(
    (state) => state.orderSlice.pagination,
  );
  
  useEffect(() => {
    const request: FetchAllOrderReq = {
      page: currentPage,
      size
    };
    dispatch(fetchAllOrder(request));
  }, [dispatch,currentPage ,size]);

  return (
    <div>
      <AppBreadcrumb items={breadCrumbItems} />
      <OrderList data ={data!}
      />
         <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default OrderListPage;
