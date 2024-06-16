import { Navigate, RouteObject } from "react-router-dom";
import { AuthLayout } from "../layouts";
import React from "react";
import { ErrorPage } from "../pages";
import SignIn from "../temp_pages/Authentication/SignIn";
import SignUp from "../temp_pages/Authentication/SignUp";
import { loginRoute, registerRoute } from "../../features/auth/presentation/pages";

export const authRoute: RouteObject =
{
    path: "auth",
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
        
        loginRoute(),
        registerRoute()
    ],
}