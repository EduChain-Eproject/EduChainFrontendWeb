import { Navigate, RouteObject } from "react-router-dom";
import { AuthLayout } from "../layouts";
import React from "react";
import { ErrorPage } from "../pages";
import SignIn from "../temp_pages/Authentication/SignIn";
import SignUp from "../temp_pages/Authentication/SignUp";

export const authRoute: RouteObject =
{
    path: "auth",
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
        {
            path:"",
            element:<Navigate to={"signup"} />
        },
        {
            path: "signup",
            element: <SignIn />,
        },
        {
            path: "signin",
            element: <SignUp />,
        },
    ],
}