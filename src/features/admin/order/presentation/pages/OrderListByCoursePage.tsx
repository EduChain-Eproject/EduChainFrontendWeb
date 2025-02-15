import React, { useEffect, useState } from 'react';
import { RouteObject, useParams } from 'react-router-dom';
import OrderListByCourse from '../components/OrderListByCourse';
import AppBreadcrumb from '../../../../../common/components/Breadcrumbs/AppBreadcrumb';
import Pagination from '../../../../../common/components/Pagination/Pagination';
import SearchComponent from '../../../../../common/components/Pagination/Search';
import { useAppDispatch, useAppSelector } from '../../../../../common/context/store';
import { setPage } from '../../data/redux/orderAdminSlice';
import { fetchOrderByCourse, GetOrderCourseReq } from '../../data/redux/action/fetchOrderByCourse';

export const route: () => RouteObject = () => {
    return {
        path: "order/course/:courseId",
        element: <OrderListByCoursePage />
    }
}

const breadCrumbItems = [
    {
        label: "Home", href: "/dashboard",
    },
    {
        label: "Order list", href: "#",
    },
    {
        label: "Order list by course", href: "#",
    },
]

const OrderListByCoursePage: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const [titleSearch, setSearch] = useState('');
    const [size, setSize] = useState(3);
    const { totalPages, currentPage } = useAppSelector((state) => state.orderSlice.pagination);

    const dispatch = useAppDispatch();

    const handlePageChange = (pageNumber: number) => {
        dispatch(setPage(pageNumber));
      };
    const handleSearch = (query: string) => {
        setSearch(query); 
      };
      const { data, status, error } = useAppSelector((state) => state.orderSlice.orders);  

      useEffect(() => {   
          const request:GetOrderCourseReq  = {
            titleSearch,
            page: currentPage,
            size,
            courseId: Number(courseId),
          };
          console.log(request);
          dispatch(fetchOrderByCourse(request));
        
      }, [ dispatch, titleSearch, currentPage, size]);


    return (
        <div>
            <AppBreadcrumb items={breadCrumbItems} />
            <SearchComponent onSearch={handleSearch} placeholder="Search by Title..." value={titleSearch} />
            <OrderListByCourse  data={data!} />
            <Pagination 
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      /> 
        </div>
    );
};

export default OrderListByCoursePage;
