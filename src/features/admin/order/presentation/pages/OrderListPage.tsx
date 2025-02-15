import React, { useEffect, useState } from 'react';
import { RouteObject, useNavigate } from 'react-router-dom';
import AppBreadcrumb from '../../../../../common/components/Breadcrumbs/AppBreadcrumb';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../common/context/store';
import Pagination from '../../../../../common/components/Pagination/Pagination';
import { setPage } from '../../data/redux/orderAdminSlice';
import { fetchAllOrder, FetchAllOrderReq } from '../../data/redux/action/fetchAllOrder';
import SearchComponent from '../../../../../common/components/Pagination/Search';
import OrderList from '../components/OrderList';

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
  const [titleSearch, setSearch] = useState('');
  useEffect(() => {
    const request: FetchAllOrderReq = {
      page: currentPage,
      size,
      titleSearch
    };
    dispatch(fetchAllOrder(request));
  }, [dispatch,currentPage ,size,titleSearch]);
  
  const handleSearch = (query: string) => {
    setSearch(query); 
  };

  return (
    <div>
      <AppBreadcrumb items={breadCrumbItems} />
      <SearchComponent onSearch={handleSearch} placeholder="Search by Title..." value={titleSearch} />
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
