import { RouteObject } from "react-router-dom";
import { DashboardTeacherLayout } from "../layouts";
import { ErrorPage } from "../pages";
import React from "react";

export const teacherRoutes: RouteObject = {
    path: "dashboard/teacher",
    element: <DashboardTeacherLayout />,
    errorElement: <ErrorPage />,
    children: []
}