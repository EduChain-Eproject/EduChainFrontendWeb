import { RouteObject } from "react-router-dom";
import React from "react";
import { HomeLayout } from "../../layouts";

export const communityRoutes: RouteObject = {
    path: "community",
    element: <HomeLayout />,
    children: []
}