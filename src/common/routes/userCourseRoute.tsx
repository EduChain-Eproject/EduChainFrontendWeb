import { RouteObject } from "react-router-dom";
import { UserProfileLayout } from "../layouts";
import React from "react";
import ErrorPage from "../pages/ErrorPage";
import { getUserCourseRoute } from "../../features/user_course/presentation/page";

export const userCourseRoute: RouteObject = {
    path: 'profile',
    // element: <UserProfileLayout />,
    element: <UserProfileLayout />,
    errorElement: <ErrorPage />,
    children: [
        getUserCourseRoute()
    ],
  };
  