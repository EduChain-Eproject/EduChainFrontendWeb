import { RouteObject } from "react-router-dom";
import React from "react";
import { HomeLayout } from "../../layouts";

export const blogRoutes: RouteObject = {
    path: "blog",
    element: <HomeLayout />,
    children: []
}