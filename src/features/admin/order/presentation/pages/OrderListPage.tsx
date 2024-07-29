import React, { useState } from 'react';
import { RouteObject, useNavigate } from 'react-router-dom';
import OrderList from '../components/orderList';
import AppBreadcrumb from '../../../../../common/components/Breadcrumbs/AppBreadcrumb';
import { useAppDispatch, useAppSelector } from '../../../../../common/context/store';

export const route: () => RouteObject = () => {
    return {
        path: "order",
        element: <OrderListPage />
    }
}

const breadCrumbItems = [
    {
        label: "Home", href: "/dashboard",
    },
    {
        label: "Order list", href: "#",
    },
]

const OrderListPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { data, status, error } = useAppSelector(
        (state) => state.orderAdminSlice.orders,
    );


    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [sortBy, setSortBy] = useState('createdAt');

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    return (
        <div>
            <AppBreadcrumb items={breadCrumbItems} />
            <OrderList
                totalPages={data?. || 0}
                currentPage={page}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default OrderListPage;
