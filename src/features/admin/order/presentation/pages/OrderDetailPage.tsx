import React from 'react';
import { RouteObject } from 'react-router-dom';
import OrderList from '../components/orderList';
import OrderDetail from '../components/OrderDetail';
import AppBreadcrumb from '../../../../../common/components/Breadcrumbs/AppBreadcrumb';

export const route: () => RouteObject = () => {
    return {
        path: "order/:orderId",
        element: <OrderDetailPage />
    }
}

const breadCrumbItems = [
    {
        label: "Home", href: "/dashboard",
    },
    {
        label: "Order list", href: "/dashboard/order",
    },
    {
        label: "Order Detail", href: "#",
    },
]

const OrderDetailPage: React.FC = () => {
    return (
        <div>
            <AppBreadcrumb items={breadCrumbItems} />
            <OrderDetail />
        </div>
    );
};

export default OrderDetailPage;
