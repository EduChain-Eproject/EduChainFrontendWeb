import React from 'react';
import { RouteObject } from 'react-router-dom';
import OrderListByCourse from '../components/OrderListByCourse';
import AppBreadcrumb from '../../../../../common/components/Breadcrumbs/AppBreadcrumb';

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
    return (
        <div>
            <AppBreadcrumb items={breadCrumbItems} />
            <OrderListByCourse />
        </div>
    );
};

export default OrderListByCoursePage;
