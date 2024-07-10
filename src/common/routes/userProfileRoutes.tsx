import { RouteObject } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import React from "react";
import {getUserProfileRoutes} 
from "../../features/userprofile/presentation/pages";
import {updateUserRoute} 
from "../../features/userprofile/presentation/pages";
import { AuthLayout, HomeLayout, UserProfileLayout } from "../layouts";
import GetUserProfilePage from "../../features/userprofile/presentation/pages/GetUserProfilePage";

export const userProfileRoutes : RouteObject = {
    path: "profile",
    element:<UserProfileLayout />,
    errorElement: <ErrorPage/>,
    children: [
        getUserProfileRoutes()  
    ],
}

export const updateUserProfileRoutes: RouteObject = {
    path:"update-user",
    element:<UserProfileLayout/>,
    errorElement:<ErrorPage/>,
    children:[
        updateUserRoute()
    ]
}