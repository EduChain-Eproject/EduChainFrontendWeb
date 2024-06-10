import { RouteObject } from "react-router-dom";
import { DashboardCensorLayout } from "../layouts";
import React from "react";
import { ErrorPage } from "../pages";

export const censorRoutes: RouteObject = {
    path: "dashboard/censor",
    element: <DashboardCensorLayout />,
    errorElement: <ErrorPage />,
    children: []
}