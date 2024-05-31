
import { RouteObject } from "react-router-dom";
import { DashboardAdminLayout } from "../layouts";
import { ErrorPage } from "../pages";
import React from "react";
import Calendar from '../temp_pages/Calendar';
import Chart from '../temp_pages/Chart';
import FormElements from '../temp_pages/Form/FormElements';
import FormLayout from '../temp_pages/Form/FormLayout';
import Profile from '../temp_pages/Profile';
import Settings from '../temp_pages/Settings';
import Tables from '../temp_pages/Tables';
import Alerts from '../temp_pages/UiElements/Alerts';
import Buttons from '../temp_pages/UiElements/Buttons';
import { dashboardRoute } from "../../features/admin/presentation/pages";

const tempRoutes: RouteObject[] = [
    {
        path: 'calendar',
        element: <Calendar />,
    },
    {
        path: 'chart',
        element: <Chart />,
    },
    {
        path: 'forms/form-elements',
        element: <FormElements />,
    },
    {
        path: 'forms/form-layout',
        element: <FormLayout />,
    },
    {
        path: 'profile',
        element: <Profile />,
    },
    {
        path: 'settings',
        element: <Settings />,
    },
    {
        path: 'tables',
        element: <Tables />,
    },
    {
        path: 'ui/alerts',
        element: <Alerts />,
    },
    {
        path: 'ui/buttons',
        element: <Buttons />,
    },
]

export const adminRoutes: RouteObject = {
    path: "dashboard",
    element: <DashboardAdminLayout />,
    errorElement: <ErrorPage />,
    children: [
        dashboardRoute(),
        ...tempRoutes,
    ],
}