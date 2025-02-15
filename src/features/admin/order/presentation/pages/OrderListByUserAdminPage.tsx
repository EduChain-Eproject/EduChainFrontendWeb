import React from "react";
import { RouteObject, useParams } from "react-router-dom";
import AppBreadcrumb from "../../../../../common/components/Breadcrumbs/AppBreadcrumb";
import OrderListByUserAdminComp from "../components/OrderListByUserAdminComp";

export const route: () => RouteObject = () => {
    return {
        path: "order/user/:userId",
        element: <OrderListByUserAdminPage />
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

const OrderListByUserAdminPage: React.FC = () => {
    const { userId } = useParams(); // Extract userId from the URL
    console.log(userId);
    return (
        <div>
            <AppBreadcrumb items={breadCrumbItems} />
            <OrderListByUserAdminComp userId={userId!} /> {/* Pass userId to your component */}
        </div>
    );
};

export default OrderListByUserAdminPage;