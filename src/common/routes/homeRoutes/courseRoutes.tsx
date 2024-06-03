import { RouteObject } from "react-router-dom";
import React from "react";
import { HomeLayout } from "../../layouts";
import { createCourseRoute, deleteCourseRoute, getCourseDetailRoute, getCoursesRoute, updateCourseRoute } from "../../../features/course/course/presentation/pages";

export const courseRoutes: RouteObject = {
    path: "course",
    element: <HomeLayout />,
    children: [
        getCoursesRoute(),
        getCourseDetailRoute(),
        createCourseRoute(),
        updateCourseRoute(),
        deleteCourseRoute()
    ]
}