import { Outlet, RouteObject } from "react-router-dom";
import React from "react";
import {
    BlogDetailRoute,
    BlogListRoute,
    CreateBlogRoute,
    UpdateBlogRoute
} from '../../../features/front-end/blogs/presentation/pages/index'

export const communityRoutes: RouteObject = {
    path: "community",
    element: <>
        <Outlet />
    </>,
    children: [
        BlogListRoute(),
        BlogDetailRoute(),
        CreateBlogRoute(),
        UpdateBlogRoute()
    ]
}