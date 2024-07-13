import { Outlet, RouteObject } from "react-router-dom";
import React from "react";
import { HomeLayout } from "../../layouts";
import { getCourseDetailRoute, getLessonDetailRoute, getListCoursesRoute } from "../../../features/course/course/student/presentation/pages";

export const courseRoutes: RouteObject = {
    path: "courses",
    element: <>
        <Outlet />
    </>,
    children: [
        getListCoursesRoute(),
        getCourseDetailRoute(),
        getLessonDetailRoute()
    ]
}