import React from 'react';
import { RouteObject } from 'react-router-dom';
import OrderListByUser from '../components/OrderListByUser';
import AppBreadcrumb from '../../../../../common/components/Breadcrumbs/AppBreadcrumb';

export const route: () => RouteObject = () => {
    return {
        //path: "order/user/:userId",
        path: "order/user",
        element: <OrderListByUserPage />
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
        label: "Order list by user", href: "#",
    },
]

const OrderListByUserPage: React.FC = () => {
    return (
        <div>
            <AppBreadcrumb items={breadCrumbItems} />
            <OrderListByUser />
        </div>
    );
};

export default OrderListByUserPage;
