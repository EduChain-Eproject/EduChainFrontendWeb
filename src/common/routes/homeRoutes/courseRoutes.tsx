import { RouteObject } from "react-router-dom";
import React from "react";
import { HomeLayout } from "../../layouts";

export const courseRoutes: RouteObject = {
    path: "course",
    element: <HomeLayout />,
    children: []
}