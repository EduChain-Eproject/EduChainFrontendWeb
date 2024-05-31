import { RouteObject } from "react-router-dom";
import React from "react";
import { HomeLayout } from "../../layouts";
import { courseRoutes } from "./courseRoutes";
import { communityRoutes } from "./communityRoutes";
import { blogRoutes } from "./blogRoutes";

export const homeRoutes: RouteObject = {
    path: "",
    element: <HomeLayout />,
    children: [
        courseRoutes,
        communityRoutes,
        blogRoutes
    ]
}